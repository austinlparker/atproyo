import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getWebRequest } from "vinxi/http";
import { getServerContext } from "../server";
import { useAppSession } from "../lib/session";

export const loginFn = createServerFn(
  "POST",
  async (formData: FormData, { request }) => {
    const { oauthClient } = getServerContext();
    const handle = formData.get("handle") as string;

    const url = await oauthClient.authorize(handle, {
      scope: "atproto transition:generic",
    });
    throw redirect({
      to: url.toString(),
    });
  },
);

export const oauthCallbackFn = createServerFn("GET", async () => {
  const { oauthClient } = getServerContext();
  const request = getWebRequest();
  const params = new URLSearchParams(request.url.split("?")[1] || "");
  try {
    const { session } = await oauthClient.callback(params);

    const cookieSession = await useAppSession();
    await cookieSession.update({
      did: session.did,
    });
  } catch (err) {
    console.log(err);
  }
  throw redirect({
    to: "/",
  });
});
