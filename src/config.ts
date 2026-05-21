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
