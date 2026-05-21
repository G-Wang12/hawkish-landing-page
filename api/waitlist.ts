import { handleWaitlistSignup } from "../server/waitlist";

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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
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

  const body =
    typeof req.body === "string"
      ? (JSON.parse(req.body) as { phone?: string; email?: string })
      : ((req.body ?? {}) as { phone?: string; email?: string });

  const result = await handleWaitlistSignup(process.env, body);
  res.status(result.status).json(result.body);
}
