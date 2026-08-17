import { tasks } from "@trigger.dev/sdk";

import type { helloWorldTask } from "@/trigger/example";

export async function POST(request: Request) {
  const { message } = await request.json();

  const handle = await tasks.trigger<typeof helloWorldTask>("hello-world", {
    message: message ?? "Hello from my app!",
  });

  return Response.json({ runId: handle.id });
}
