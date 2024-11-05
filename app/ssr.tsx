/// <reference types="vinxi/types/server" />
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/start/server";
import { getRouterManifest } from "@tanstack/start/router-manifest";
import { createRouter } from "./router";
import { initializeServer } from "./server";

await initializeServer();

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler);
