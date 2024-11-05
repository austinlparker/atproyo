import * as React from "react";
import { createServerFn } from "@tanstack/start";
import { createFileRoute } from "@tanstack/react-router";

const handleLogin = createServerFn("POST", async (formData: FormData) => {
  const handle = formData.get("handle");

  console.log(handle);
});

export const Route = createFileRoute("/login")({
  component: LoginForm,
});

function LoginForm() {
  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const response = await handleLogin(formData);
      }}
    >
      <input name="handle" />
      <button type="submit">Login</button>
    </form>
  );
}
