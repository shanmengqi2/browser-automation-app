import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { WorkflowNav } from "@/features/workflows/components/workflow-nav"

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
              rootBox: "min-w-0 group-data-[collapsible=icon]:hidden!",
              organizationSwitcherTrigger:
                "w-full justify-start border-0 bg-transparent px-0 text-white shadow-none hover:bg-white/5 hover:text-white",
            },
          }}
        />
        <SidebarTrigger className="shrink-0 text-white hover:bg-white/10 hover:text-white" />
      </SidebarHeader>

      <SidebarContent>
        <WorkflowNav />
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
