import { handleWaitlistSignup } from "./_lib/waitlist.js";

type VercelRequest = {
  method?: string;
  body?: unknown;
};

type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
  setHeader: (name: string, value: string) => void;
  end: () => void;
};

function parseWaitlistBody(
  raw: unknown
): { phone?: string; email?: string } | { error: string } {
  if (raw == null) return {};
  if (typeof raw === "object" && !Buffer.isBuffer(raw)) {
    return raw as { phone?: string; email?: string };
  }
  if (typeof raw !== "string" || !raw.trim()) {
    return { error: "Invalid JSON body" };
  }
  try {
    return JSON.parse(raw) as { phone?: string; email?: string };
  } catch {
    return { error: "Invalid JSON body" };
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  try {
    if (req.method === "OPTIONS") {
      res.status(204).setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.end();
      return;
    }

    if (req.method !== "POST") {
      res.status(405).json({ ok: false, error: "Method not allowed" });
      return;
    }

    const parsed = parseWaitlistBody(req.body);
    if ("error" in parsed) {
      res.status(400).json({ ok: false, error: parsed.error });
      return;
    }

    const result = await handleWaitlistSignup(process.env, parsed);
    res.status(result.status).json(result.body);
  } catch (err) {
    console.error("[api/waitlist] unhandled:", err);
    res.status(500).json({
      ok: false,
      error: "Something went wrong. Try again in a moment.",
    });
  }
}
