"use client"

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import {
  Database,
  Download,
  Globe,
  Mail,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const workflows = [
  { name: "dominant-wasp", icon: Workflow },
  { name: "honest-reindeer", icon: Globe },
  { name: "expected-llama", icon: Mail },
  { name: "essential-ocelot", icon: Database },
  { name: "creepy-echidna", icon: Zap },
  { name: "eastern-silkworm", icon: Search },
  { name: "cultural-lion", icon: Download },
  { name: "proud-weasel", icon: ShieldCheck },
  { name: "regional-bonobo", icon: Sparkles },
]

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      {...props}
      className="border-white/5 bg-[#1f1f1f] text-white"
    >
      <SidebarHeader className="flex-row items-center gap-4 px-4 py-5 group-data-[collapsible=icon]:px-2">
        <OrganizationSwitcher
          hidePersonal
          appearance={{
            elements: {
              rootBox: "min-w-0 group-data-[collapsible=icon]:!hidden",
              organizationSwitcherTrigger:
                "w-full justify-start border-0 bg-transparent px-0 text-white shadow-none hover:bg-white/5 hover:text-white",
            },
          }}
        />
        <SidebarTrigger className="shrink-0 text-white hover:bg-white/10 hover:text-white" />

        {/* <SidebarMenuButton
          onClick={toggleSidebar}
          tooltip="Expand sidebar"
          className="hidden h-12 justify-center rounded-xl px-0 text-white group-data-[collapsible=icon]:flex hover:bg-white/10 hover:text-white"
        >
          <Building2 />
          <span className="sr-only">Expand sidebar</span>
        </SidebarMenuButton> */}
      </SidebarHeader>

      <SidebarContent>
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
                <SidebarMenuItem key={workflow.name}>
                  <SidebarMenuButton
                    isActive={index === 0}
                    tooltip={workflow.name}
                    className="h-11 rounded-xl px-3 text-base text-white/90 hover:bg-white/10 hover:text-white data-active:bg-white/10 data-active:text-white"
                  >
                    <workflow.icon />
                    <span className="group-data-[collapsible=icon]:hidden">
                      {workflow.name}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-5 group-data-[collapsible=icon]:px-2">
        <UserButton
          appearance={{
            elements: {
              userButtonTrigger:
                "w-full justify-start rounded-xl px-2 text-white hover:bg-white/10 hover:text-white",
            },
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}

export { AppSidebar }
