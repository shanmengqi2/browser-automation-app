import { ReactFlowProvider } from "@xyflow/react"

import { WorkflowShell } from "@/features/workflows/components/workflow-shell"
import { Room } from "@/features/workflows/components/room"
import { auth } from "@clerk/nextjs/server"
import { notFound } from "next/navigation"
import { getWorkflow } from "@/features/workflows/data"
import { liveblocks } from "@/lib/liveblocks"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { orgId } = await auth()
  if (!orgId) notFound()

  const workflow = await getWorkflow(orgId, id)
  if (!workflow) notFound()

  // Ensure the Liveblocks room exists and grant write access to the org.
  // The org ID matches the `groupIds` set in the auth endpoint's ID token.
  await liveblocks.getOrCreateRoom(id, {
    organizationId: orgId,
    defaultAccesses: [],
    groupsAccesses: {
      [orgId]: ["room:write"],
    },
    metadata: {
      title: workflow.name,
    },
  })

  // The palette lives in the sidebar, outside the canvas's <ReactFlow>. Wrap the
  // whole page in a provider so the canvas and sidebar share one React Flow store
  // and the palette can add nodes to the same graph the canvas renders.
  return (
    <ReactFlowProvider>
      <Room roomId={id}>
        <WorkflowShell workflowId={id} />
      </Room>
    </ReactFlowProvider>
  )
}
