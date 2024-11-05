import { createFileRoute, useLoaderData, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute('/_authed/home')({
  component: HomePage,
  loader: async() => {
    const user = await
  }
})
