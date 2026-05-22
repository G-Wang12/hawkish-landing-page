import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin } from "vite";
import { handleWaitlistSignup } from "./api/_lib/waitlist.js";

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function waitlistMiddleware(
  env: Record<string, string>
): (req: IncomingMessage, res: ServerResponse, next: () => void) => void {
  return async (req, res, next) => {
    const path = req.url?.split("?")[0];
    if (path !== "/api/waitlist") {
      next();
      return;
    }

    if (req.method === "OPTIONS") {
      res.statusCode = 204;
      res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.end();
      return;
    }

    if (req.method !== "POST") {
      res.statusCode = 405;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: false, error: "Method not allowed" }));
      return;
    }

    let body: { phone?: string; email?: string };
    try {
      const raw = await readBody(req);
      body = raw ? (JSON.parse(raw) as typeof body) : {};
    } catch {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ ok: false, error: "Invalid JSON body" }));
      return;
    }

    const result = await handleWaitlistSignup(env, body);
    res.statusCode = result.status;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result.body));
  };
}

export function waitlistApiPlugin(env: Record<string, string>): Plugin {
  const middleware = waitlistMiddleware(env);
  return {
    name: "hawkish-waitlist-api",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
