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

/** Prefilled starter — bracketed parts are placeholders to replace before sending. */
export const defaultStarterMessage =
  "Alert me on [your topics], watch [tickers], threshold [0.0 - 1.0]";

/** Example first messages shown on the landing page (placeholders, not prescriptive topics). */
export const firstMessageExamples = [
  defaultStarterMessage,
  "Watch [tickers] for me",
  "Only big alerts, threshold [0.8]",
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
