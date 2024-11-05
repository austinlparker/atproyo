import { createDb, migrateToLatest, type Database } from "./lib/database";
import { createClient } from "./lib/oauth";
import type { NodeOAuthClient } from "@atproto/oauth-client-node";

interface ServerContext {
  db: Database;
  oauthClient: NodeOAuthClient;
}

let context: ServerContext | undefined;

export async function initializeServer() {
  if (context) return context;

  // Initialize database
  const db = createDb("atproyo.db");
  await migrateToLatest(db);

  // Initialize OAuth client
  const oauthClient = await createClient(db);

  context = { db, oauthClient };
  return context;
}

export function getServerContext(): ServerContext {
  if (!context) {
    throw new Error("Server context not initialized");
  }
  return context;
}
