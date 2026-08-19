import { auth, clerkClient } from "@clerk/nextjs/server"

// Display info for a single user, matching the `UserMeta["info"]` shape in
// liveblocks.config.ts. Consumed by `resolveUsers` in LiveblocksProvider.
type UserInfo = Liveblocks["UserMeta"]["info"]

export async function POST(request: Request) {
  const { userId, orgId } = await auth()

  if (!userId || !orgId) {
    return new Response("Unauthorized", { status: 401 })
  }

  let userIds: unknown
  try {
    ;({ userIds } = await request.json())
  } catch {
    return new Response("Invalid JSON body", { status: 400 })
  }

  if (
    !Array.isArray(userIds) ||
    !userIds.every((id): id is string => typeof id === "string")
  ) {
    return new Response("`userIds` must be an array of strings", {
      status: 400,
    })
  }

  // Empty request — nothing to resolve, skip the Clerk round-trip.
  if (userIds.length === 0) {
    return Response.json([])
  }

  const client = await clerkClient()

  // Clerk returns matched users in an arbitrary order and omits unknown IDs, so
  // index them by ID and rebuild the response in the requested order.
  const { data: users } = await client.users.getUserList({
    userId: userIds,
    limit: userIds.length,
    organizationId: [orgId],
  })

  const byId = new Map(users.map((user) => [user.id, user]))

  const result: (UserInfo | null)[] = userIds.map((id) => {
    const user = byId.get(id)

    if (!user) {
      return null
    }

    const name =
      [user.firstName, user.lastName].filter(Boolean).join(" ") ||
      user.username ||
      user.primaryEmailAddress?.emailAddress ||
      user.id

    return {
      name,
      avatar: user.imageUrl,
    }
  })

  return Response.json(result)
}
