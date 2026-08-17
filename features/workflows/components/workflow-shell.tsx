import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { runWorkflowAction } from "@/features/workflows/actions"
import { RightSidebar } from "@/features/workflows/components/right-sidebar"

function WorkflowShell({ workflowId }: { workflowId: string }) {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      data-workflow-id={workflowId}
      className="size-full"
    >
      <ResizablePanel minSize="30rem">
        <ResizablePanelGroup orientation="vertical" className="h-full w-full">
          <ResizablePanel minSize="18rem" className="flex items-center justify-center">
            <span>Canvas</span>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize="8rem"
            minSize="6rem"
            className="flex items-center justify-center"
          >
            <span>Logs</span>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizableHandle />
      <RightSidebar workflowId={workflowId} runWorkflow={runWorkflowAction} />
    </ResizablePanelGroup>
  )
}

export { WorkflowShell }
