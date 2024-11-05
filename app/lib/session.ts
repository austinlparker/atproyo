import { useSession } from "vinxi/http";
import type { AuthSession } from "./database";

export type AppSession = {
  did: AuthSession["key"];
  name: string;
};

export function useAppSession() {
  return useSession<AppSession>({
    password: process.env.SESSON_SECRET!,
  });
}
