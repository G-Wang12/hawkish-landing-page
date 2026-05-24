import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  buildMessagesUrl,
  defaultStarterMessage,
  formatPhoneDisplay,
  isAppleMessagesDevice,
} from "../config";

const endpoint =
  (import.meta.env.VITE_WAITLIST_URL as string | undefined)?.trim() ||
  "/api/waitlist";

type WaitlistResponse = {
  ok: boolean;
  error?: string | { message?: string };
  message?: string;
  textLine?: string;
};

function messageFromApi(data: WaitlistResponse | null, status: number): string {
  if (data && typeof data.error === "string") return data.error;
  if (
    data?.error &&
    typeof data.error === "object" &&
    typeof data.error.message === "string"
  ) {
    return data.error.message;
  }
  if (data && typeof data.message === "string") return data.message;
  if (status === 503) {
    return "Signup is temporarily unavailable. Try again later.";
  }
  if (status >= 500) {
    return "Server error. Please try again in a moment.";
  }
  return "Something went wrong. Try again in a moment.";
}

export function SignupForm() {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [textLine, setTextLine] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const autoOpenedRef = useRef(false);

  useEffect(() => {
    if (status !== "success" || !textLine || autoOpenedRef.current) return;
    if (!isAppleMessagesDevice()) return;
    autoOpenedRef.current = true;
    window.location.href = buildMessagesUrl(textLine, defaultStarterMessage);
  }, [status, textLine]);

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
        throw new Error(messageFromApi(data, res.status));
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
    const messagesUrl = textLine
      ? buildMessagesUrl(textLine, defaultStarterMessage)
      : null;

    return (
      <div className="signup-success" role="status">
        <p className="signup-success-title">You&apos;re on the list.</p>
        {displayLine && messagesUrl ? (
          <>
            <p className="signup-success-body">
              Open Messages from the same phone you signed up with. It&apos;s
              your personal Hawkish line — not shared with other users.
            </p>
            <div className="signup-success-actions">
              <a href={messagesUrl} className="btn btn-primary signup-open-messages">
                Open in Messages
              </a>
              <p className="signup-starter-hint">
                A starter message is ready — replace the bracketed parts, then
                send.
              </p>
            </div>
            <div className="signup-copy-block">
              <p className="get-started-label">Your Hawkish line (iMessage)</p>
              <p className="signup-success-number">{displayLine}</p>
              <button
                type="button"
                className="btn btn-ghost signup-copy-number"
                onClick={copyTextLine}
                aria-label={`Copy number ${textLine}`}
              >
                {copied ? "Copied" : "Copy number"}
              </button>
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
