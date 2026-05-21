import { useState, type FormEvent } from "react";

const endpoint = import.meta.env.VITE_WAITLIST_URL as string | undefined;

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      setErrorMessage("Enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email: trimmed }),
        });
        if (!res.ok) throw new Error("Request failed");
        setStatus("success");
        setEmail("");
      } catch {
        setStatus("error");
        setErrorMessage("Something went wrong. Try again in a moment.");
      }
      return;
    }

    setStatus("success");
    setEmail("");
  }

  if (status === "success") {
    return (
      <div className="signup-success" role="status">
        <p className="signup-success-title">You&apos;re on the list.</p>
        <p className="signup-success-body">
          We&apos;ll reach out when Hawkish opens for early access.
        </p>
      </div>
    );
  }

  return (
    <form className="signup-form" onSubmit={handleSubmit} noValidate>
      <label htmlFor="waitlist-email" className="visually-hidden">
        Email for early access
      </label>
      <div className="signup-row">
        <input
          id="waitlist-email"
          type="email"
          name="email"
          placeholder="you@company.com"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={status === "loading"}
          required
        />
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Joining…" : "Get early access"}
        </button>
      </div>
      {status === "error" && errorMessage && (
        <p className="signup-error" role="alert">
          {errorMessage}
        </p>
      )}
      <p className="signup-note">
        No spam — just a note when iMessage alerts are ready for you.
      </p>
    </form>
  );
}
