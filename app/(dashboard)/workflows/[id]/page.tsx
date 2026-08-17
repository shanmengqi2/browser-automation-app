import { notFound } from "next/navigation"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  // throw new Error("abc")
  // notFound()

  return <div className="p-6">{id}</div>
}
