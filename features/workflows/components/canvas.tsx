"use client"

import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
  ConnectionLineType,
  type Edge,
  type Node,
  type OnConnect,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import { useTheme } from "next-themes"
import { useCallback, useSyncExternalStore } from "react"

import { ResizablePanel } from "@/components/ui/resizable"

const initialNodes: Node[] = [
  {
    id: "start",
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: "Start" },
  },
  {
    id: "process",
    position: { x: 200, y: 100 },
    data: { label: "Process" },
  },
  {
    id: "end",
    type: "output",
    position: { x: 400, y: 0 },
    data: { label: "End" },
  },
]

const initialEdges: Edge[] = [
  { id: "start-process", source: "start", target: "process" },
  { id: "process-end", source: "process", target: "end" },
]

const emptySubscribe = () => () => {}

function Canvas() {
  const { resolvedTheme } = useTheme()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect: OnConnect = useCallback(
    (connection) =>
      setEdges((currentEdges) => addEdge(connection, currentEdges)),
    [setEdges]
  )

  return (
    <ResizablePanel minSize="18rem" className="relative">
      <div className="size-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          colorMode={mounted && resolvedTheme === "dark" ? "dark" : "light"}
          connectionLineType={ConnectionLineType.SmoothStep}
          connectionLineStyle={{ stroke: "var(--border)" }}
          defaultEdgeOptions={{
            type: "smoothstep",
            style: { stroke: "var(--border)" },
          }}
          style={
            {
              "--xy-background-color": "var(--background)",
              "--xy-edge-stroke-width": 2,
              "--xy-connectionline-stroke-width": 2,
            } as React.CSSProperties
          }
          maxZoom={1}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </ResizablePanel>
  )
}

export { Canvas }
