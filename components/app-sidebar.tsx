import { auth } from "@clerk/nextjs/server"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { WorkflowNav } from "@/features/workflows/components/workflow-nav"
import { createWorkflowAction } from "@/features/workflows/actions"
import { listWorkflows } from "@/features/workflows/data"

async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { orgId } = await auth()
  const workflows = orgId ? await listWorkflows(orgId) : []

  return (
    <Sidebar
      variant="inset"
      collapsible="icon"
      {...props}
      className="border-sidebar-border"
    >
      <SidebarHeader className="flex-row items-center gap-4 px-4 py-5 group-data-[collapsible=icon]:px-2">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterSelectOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          hidePersonal
          appearance={{
            elements: {
              rootBox: "min-w-0 group-data-[collapsible=icon]:hidden!",
              organizationSwitcherTrigger:
                "w-full justify-start border-0 bg-transparent px-0 text-sidebar-foreground shadow-none hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            },
          }}
        />
        <SidebarTrigger className="shrink-0 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" />
      </SidebarHeader>

      <SidebarContent>
        <WorkflowNav
          workflows={workflows}
          createWorkflow={createWorkflowAction}
        />
      </SidebarContent>

      <SidebarFooter className="px-4 py-5 group-data-[collapsible=icon]:px-2">
        <UserButton
          appearance={{
            elements: {
              userButtonTrigger:
                "w-full justify-start rounded-xl px-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            },
          }}
        />
      </SidebarFooter>
    </Sidebar>
  )
}

export { AppSidebar }
