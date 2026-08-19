"use server"

import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth as triggerAuth, tasks } from "@trigger.dev/sdk"

import type { helloWorldTask } from "@/trigger/example"
import { createWorkflow, deleteWorkflow } from "@/features/workflows/data"
import { liveblocks } from "@/lib/liveblocks"

export async function createWorkflowAction(name: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const workflow = await createWorkflow(orgId, name)

  revalidatePath("/workflows", "layout")

  redirect(`/workflows/${workflow.id}`)
}

export async function deleteWorkflowAction(workflowId: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const workflow = await deleteWorkflow(orgId, workflowId)

  // Only clean up the room if a row actually belonged to this org — this keeps
  // the action from deleting another org's room on a mismatched id.
  if (workflow) {
    // The workflow id doubles as its Liveblocks room id (see the workflow page).
    await liveblocks.deleteRoom(workflowId)
  }

  revalidatePath("/workflows", "layout")

  redirect("/")
}

export async function runWorkflowAction(workflowId: string) {
  const { orgId } = await auth()

  if (!orgId) {
    throw new Error("No active organization")
  }

  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    message: `Run workflow ${workflowId}`,
  })

  const publicAccessToken = await triggerAuth.createPublicToken({
    scopes: { read: { runs: [handle.id] } },
  })

  return { runId: handle.id, publicAccessToken }
}
