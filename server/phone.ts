const E164 = /^\+[1-9]\d{6,14}$/;

/** Normalize common US/international inputs to E.164 for Photon. */
export function toE164(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 10) return null;

  let normalized: string;
  if (digits.length === 10) {
    normalized = `+1${digits}`;
  } else if (digits.length === 11 && digits.startsWith("1")) {
    normalized = `+${digits}`;
  } else if (raw.trim().startsWith("+") && digits.length >= 10) {
    normalized = `+${digits}`;
  } else {
    return null;
  }

  return E164.test(normalized) ? normalized : null;
}
