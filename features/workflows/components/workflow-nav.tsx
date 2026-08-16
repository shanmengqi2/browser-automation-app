"use client"

import { Plus, Workflow } from "lucide-react"

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

const workflows = [
  "dominant-wasp",
  "honest-reindeer",
  "expected-llama",
  "essential-ocelot",
  "creepy-echidna",
  "eastern-silkworm",
  "cultural-lion",
  "proud-weasel",
  "regional-bonobo",
]

function WorkflowNav() {
  const { state } = useSidebar()

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
              {workflows.map((workflow, index) => (
                <SidebarMenuItem key={workflow}>
                  <SidebarMenuButton isActive={index === 0}>
                    <span>{workflow}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <Button variant="outline" size="sm" className="w-full">
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
      >
        <Plus />
        <span className="sr-only">New workflow</span>
      </SidebarGroupAction>
      <SidebarGroupContent>
        <SidebarMenu className="gap-y-0.5">
          {workflows.map((workflow, index) => (
            <SidebarMenuItem key={workflow}>
              <SidebarMenuButton
                isActive={index === 0}
                tooltip={workflow}
                className="h-11 rounded-xl px-3 text-base text-white/90 hover:bg-white/10 hover:text-white data-active:bg-white/10 data-active:text-white"
              >
                <span>{workflow}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

export { WorkflowNav }
