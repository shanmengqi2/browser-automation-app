import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

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
      <ResizablePanel
        defaultSize="16rem"
        minSize="14rem"
        maxSize="36rem"
        className="flex items-center justify-center"
      >
        <span>Inspector</span>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export { WorkflowShell }
