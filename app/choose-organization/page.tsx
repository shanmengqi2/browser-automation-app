import { TaskChooseOrganization } from "@clerk/nextjs"

export default function ChooseOrganizationPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <TaskChooseOrganization redirectUrlComplete="/" />
    </main>
  )
}
