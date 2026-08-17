import { notFound } from "next/navigation"

import { WorkflowShell } from "@/features/workflows/components/workflow-shell"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // throw new Error("abc")
  // notFound()

  return <WorkflowShell workflowId={id} />
}
