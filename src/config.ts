/** From .env at build/dev time — required (see vite.config.ts). */
export const iMessageNumber = (
  import.meta.env.VITE_IMESSAGE_NUMBER as string
).trim();

/** Human-friendly display (E.164 copied to clipboard). */
export function formatPhoneDisplay(e164: string): string {
  const digits = e164.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }
  return e164;
}

/** How severity threshold works — used in the starter template and field guide. */
export const thresholdExplanation =
  "Each headline is scored for severity from 0 to 1.0. Set the minimum score you want alerted on — 0 means more news, 1.0 means only the most severe headlines.";

/** Prefilled starter — bracketed parts are placeholders to replace before sending. */
export const defaultStarterMessage = [
  "Alert me on [your topics], watch [tickers]",
  "",
  "Severity threshold [on a 0–1.0 scale for headline severity. 0 = alert on more news, 1.0 = only the most severe headlines.]",
].join("\n");

/** Example first messages shown on the landing page (placeholders, not prescriptive topics). */
export const firstMessageExamples = [
  "Alert me on [your topics], watch [tickers], severity threshold [0.5 on 0–1.0]",
  "Watch [tickers] for me",
  "Only severe headlines, severity threshold [0.8 on 0–1.0]",
] as const;

/** Field-by-field guide for what users can text (shown on the landing page). */
export const textableFields = [
  {
    field: "Topics",
    example: "CPI, FOMC, inflation",
    description:
      "Macro keywords or themes. Name what you care about — empty topics can match broadly.",
  },
  {
    field: "Watchlist",
    example: "NVDA, TSLA",
    description:
      "Stock tickers to watch. Headlines mentioning these names are scored and filtered for you.",
  },
  {
    field: "Severity threshold",
    example: "0.5",
    description: thresholdExplanation,
  },
  {
    field: "Source trust",
    example: "only reputable sources",
    description:
      "Optional. Filter out low-credibility publishers — wire services rank higher than aggregators.",
  },
  {
    field: "Follow-ups",
    example: "Why is this hawkish?",
    description:
      "Reply in the same chat within 30 minutes of an alert for Grok analysis on that headline.",
  },
  {
    field: "Pause / resume",
    example: "pause alerts · resume alerts",
    description:
      "Stop macro pings when you are off the desk or on vacation. Your keywords, watchlist, and thresholds stay saved until you resume.",
  },
] as const;

/** Opens Messages on Apple devices; uses iMessage when the recipient supports it. */
export function buildMessagesUrl(e164: string, body?: string): string {
  const phone = `+${e164.replace(/\D/g, "")}`;
  const base = `sms:${phone}`;
  const message = body?.trim();
  if (!message) return base;
  return `${base}&body=${encodeURIComponent(message)}`;
}

export function isAppleMessagesDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent);
}
