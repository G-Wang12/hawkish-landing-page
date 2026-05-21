import { useState, type FormEvent } from "react";
import { formatPhoneDisplay } from "../config";

const endpoint =
  (import.meta.env.VITE_WAITLIST_URL as string | undefined)?.trim() ||
  "/api/waitlist";

type WaitlistResponse = { ok: boolean; error?: string; textLine?: string };

export function SignupForm() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [textLine, setTextLine] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function copyTextLine() {
    if (!textLine) return;
    try {
      await navigator.clipboard.writeText(textLine);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedPhone = phone.trim();
    const digits = trimmedPhone.replace(/\D/g, "");
    if (digits.length < 10) {
      setStatus("error");
      setErrorMessage("Enter the phone number you use for iMessage.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    const payload = {
      phone: trimmedPhone,
      ...(email.trim() ? { email: email.trim() } : {}),
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data: WaitlistResponse | null = null;
      try {
        data = (await res.json()) as WaitlistResponse;
      } catch {
        /* non-JSON error body */
      }

      if (!res.ok || !data?.ok) {
        throw new Error(
          data?.error || "Something went wrong. Try again in a moment."
        );
      }

      setTextLine(data?.textLine?.trim() || null);
      setCopied(false);
      setStatus("success");
      setPhone("");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Something went wrong. Try again in a moment."
      );
    }
  }

  if (status === "success") {
    const displayLine = textLine ? formatPhoneDisplay(textLine) : null;

    return (
      <div className="signup-success" role="status">
        <p className="signup-success-title">You&apos;re on the list.</p>
        {displayLine ? (
          <>
            <p className="signup-success-body">
              Text this number from the same phone you signed up with. It&apos;s
              your personal Hawkish line — not shared with other users.
            </p>
            <div className="get-started-number-block">
              <p className="get-started-label">Your Hawkish line (iMessage)</p>
              <button
                type="button"
                className="get-started-number"
                onClick={copyTextLine}
                aria-label={`Copy number ${textLine}`}
              >
                {displayLine}
              </button>
              <p className="get-started-copy-hint">
                {copied
                  ? "Copied — paste into Messages"
                  : "Tap to copy, then open Messages"}
              </p>
            </div>
          </>
        ) : (
          <p className="signup-success-body">
            Your number is linked in Photon. Open Messages from the phone you
            signed up with — check the Photon dashboard if you need your assigned
            line to text.
          </p>
        )}
      </div>
    );
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      <div className="signup-field">
        <label htmlFor="waitlist-phone">iMessage phone number</label>
        <input
          id="waitlist-phone"
          type="tel"
          name="phone"
          placeholder="+1 (415) 555-0100"
          autoComplete="tel"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={status === "loading"}
          required
        />
        <p className="signup-field-hint">
          Use the same number you&apos;ll text from. After signup you&apos;ll get a
          personal line to message Hawkish on.
        </p>
      </div>
      <div className="signup-field">
        <label htmlFor="waitlist-email">
          Email <span className="signup-optional">(optional)</span>
        </label>
        <input
          id="waitlist-email"
          type="email"
          name="email"
          placeholder="you@company.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary signup-submit"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Submitting…" : "Request access"}
      </button>
      {status === "error" && errorMessage && (
        <p className="signup-error" role="alert">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
