import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import { ArrowRight, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="min-h-svh bg-background">
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[1fr_24rem] md:items-center md:py-32">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-sm text-muted-foreground">
            <ShieldCheck className="size-4" />由 Clerk 安全保护
          </div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            让浏览器自动化工作流更简单
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
            登录后即可创建、管理并运行你的自动化任务。账号与会话由 Clerk
            安全管理。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <Button size="lg">
                  免费创建账号
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </SignUpButton>
              <SignInButton mode="modal">
                <Button size="lg" variant="outline">
                  已有账号，登录
                </Button>
              </SignInButton>
            </Show>
            <Show when="signed-in">
              <Button size="lg">
                进入工作台
                <ArrowRight data-icon="inline-end" />
              </Button>
            </Show>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 text-card-foreground shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-medium">认证状态</span>
            <span className="size-2 rounded-full bg-emerald-500" />
          </div>
          <Show when="signed-out">
            <p className="text-sm leading-6 text-muted-foreground">
              你尚未登录。创建第一个测试账号后，这里会显示你的用户头像。
            </p>
          </Show>
          <Show when="signed-in">
            <div className="flex items-center gap-3">
              <UserButton />
              <div>
                <p className="text-sm font-medium">已安全登录</p>
                <p className="text-xs text-muted-foreground">
                  点击头像管理账号
                </p>
              </div>
            </div>
          </Show>
        </div>
      </section>
    </main>
  )
}
