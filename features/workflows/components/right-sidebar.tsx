"use client"

import { useRealtimeRun } from "@trigger.dev/react-hooks"
import { PlayIcon } from "lucide-react"
import { useState, useTransition } from "react"

import type { helloWorldTask } from "@/trigger/example"

import { Button } from "@/components/ui/button"
import { ResizablePanel } from "@/components/ui/resizable"

type RunHandle = {
  runId: string
  publicAccessToken: string
}

type RightSidebarProps = {
  workflowId: string
  runWorkflow: (workflowId: string) => Promise<RunHandle>
}

function RightSidebar({ workflowId, runWorkflow }: RightSidebarProps) {
  const [isPending, startTransition] = useTransition()
  const [handle, setHandle] = useState<RunHandle | null>(null)

  const { run, error } = useRealtimeRun<typeof helloWorldTask>(handle?.runId, {
    accessToken: handle?.publicAccessToken,
    enabled: !!handle,
    skipColumns: ["payload"],
  })

  const handleRun = () => {
    startTransition(async () => {
      const next = await runWorkflow(workflowId)
      setHandle(next)
    })
  }

  return (
    <ResizablePanel
      defaultSize="16rem"
      minSize="14rem"
      maxSize="36rem"
      className="flex items-center justify-center"
    >
      <div className="flex flex-col items-center gap-3">
        <Button onClick={handleRun} disabled={isPending}>
          <PlayIcon data-icon="inline-start" />
          Run
        </Button>

        {error && (
          <p className="text-sm text-destructive">{error.message}</p>
        )}

        {run && (
          <p className="text-sm text-muted-foreground">
            {run.isCompleted
              ? `Completed: ${run.output?.message}`
              : run.isFailed
                ? "Failed"
                : run.status}
          </p>
        )}
      </div>
    </ResizablePanel>
  )
}

export { RightSidebar }
