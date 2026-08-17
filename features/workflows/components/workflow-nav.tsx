"use client"

import { Plus, Workflow } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { generateSlug } from "@/features/workflows/lib/generate-slug"
import type { Workflow as Wf } from "@/lib/db/schema"
import { useTransition } from "react"

type WorkflowNavProps = {
  workflows: Wf[]
  createWorkflow: (name: string) => Promise<void>
}

function WorkflowNav({ workflows, createWorkflow }: WorkflowNavProps) {
  const { state } = useSidebar()
  const pathname = usePathname()

  const [isPending, startTransition] = useTransition()

  const handleCreate = () => {
    startTransition(async () => {
      await createWorkflow(generateSlug())
    })
  }

  if (state === "collapsed") {
    return (
      <SidebarGroup className="px-4 py-2 group-data-[collapsible=icon]:px-2">
        <Popover>
          <PopoverTrigger asChild>
            <SidebarMenuButton
              tooltip="Workflows"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <Workflow />
              <span className="group-data-[collapsible=icon]:hidden">
                Workflows
              </span>
            </SidebarMenuButton>
          </PopoverTrigger>
          <PopoverContent side="right" align="start" sideOffset={8}>
            <PopoverHeader>
              <PopoverTitle>Workflows</PopoverTitle>
            </PopoverHeader>
            <SidebarMenu>
              {workflows.map((workflow) => (
                <SidebarMenuItem key={workflow.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/workflows/${workflow.id}`}
                  >
                    <Link href={`/workflows/${workflow.id}`}>
                      <span>{workflow.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleCreate}
              disabled={isPending}
            >
              <Plus data-icon="inline-start" />
              New workflow
            </Button>
          </PopoverContent>
        </Popover>
      </SidebarGroup>
    )
  }

  return (
    <SidebarGroup className="px-4 py-2 group-data-[collapsible=icon]:px-2">
      <SidebarGroupLabel className="h-10 px-2 text-lg font-medium text-white/70 group-data-[collapsible=icon]:hidden">
        Workflows
      </SidebarGroupLabel>
      <SidebarGroupAction
        title="New workflow"
        className="top-3 right-4 size-8 text-white hover:bg-white/10 hover:text-white"
        onClick={handleCreate}
      >
        <Plus />
        <span className="sr-only">New workflow</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu className="gap-y-0.5">
          {workflows.map((workflow) => (
            <SidebarMenuItem key={workflow.id}>
              <SidebarMenuButton
                asChild
                isActive={pathname === `/workflows/${workflow.id}`}
                tooltip={workflow.name}
                className="h-11 rounded-xl px-3 text-base text-white/90 hover:bg-white/10 hover:text-white data-active:bg-white/10 data-active:text-white"
              >
                <Link href={`/workflows/${workflow.id}`}>
                  <span>{workflow.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export { WorkflowNav }
