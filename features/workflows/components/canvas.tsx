"use client"

import {
  Background,
  Controls,
  ReactFlow,
  ConnectionLineType,
  type Edge,
  NodeTypes,
} from "@xyflow/react"
import { useLiveblocksFlow, Cursors } from "@liveblocks/react-flow"
import "@xyflow/react/dist/style.css"
import "@liveblocks/react-ui/styles.css"
import "@liveblocks/react-flow/styles.css"
import { useTheme } from "next-themes"
import { useSyncExternalStore } from "react"

import { ResizablePanel } from "@/components/ui/resizable"

import { StepNode } from "@/features/workflows/components/step-node"
import type { StepNodeType } from "@/features/workflows/nodes/node-registry"
const nodeTypes: NodeTypes = { step: StepNode }

const initialNodes: StepNodeType[] = [
  {
    id: "start",
    type: "step",
    position: { x: 0, y: 0 },
    data: { type: "start", kind: "trigger", title: "Start", values: {} },
  },
]

const initialEdges: Edge[] = []

const emptySubscribe = () => () => {}

function Canvas() {
  const { resolvedTheme } = useTheme()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDelete } =
    useLiveblocksFlow({
      suspense: true,
      nodes: { initial: initialNodes },
      edges: { initial: initialEdges },
    })

  return (
    <ResizablePanel minSize="18rem" className="relative">
      <div className="size-full">
        <ReactFlow
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDelete={onDelete}
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
          <Cursors />
        </ReactFlow>
      </div>
    </ResizablePanel>
  )
}

export { Canvas }
