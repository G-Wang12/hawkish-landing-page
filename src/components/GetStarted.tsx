import { useState } from "react";
import { formatPhoneDisplay, iMessageNumber } from "../config";

const firstMessages = [
  "Alert me on CPI and FOMC, threshold 0.5",
  "Watch TSLA and NVDA for me",
  "Only big alerts, threshold 0.8",
];

export function GetStarted() {
  const [copied, setCopied] = useState(false);

  async function copyNumber() {
    try {
      await navigator.clipboard.writeText(iMessageNumber);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="get-started">
      <div className="get-started-number-block">
        <p className="get-started-label">Text on iMessage (blue bubble)</p>
        <button
          type="button"
          className="get-started-number"
          onClick={copyNumber}
          aria-label={`Copy number ${iMessageNumber}`}
        >
          {formatPhoneDisplay(iMessageNumber)}
        </button>
        <p className="get-started-copy-hint">
          {copied ? "Copied — paste into Messages" : "Tap to copy, then open Messages"}
        </p>
      </div>

      <div className="get-started-grid">
        <div className="get-started-card">
          <h3>No register keyword</h3>
          <p>
            Your first text starts your session. Say what you want to track — no
            invite code required.
          </p>
        </div>
        <div className="get-started-card">
          <h3>First message ideas</h3>
          <ul className="get-started-examples">
            {firstMessages.map((msg) => (
              <li key={msg}>
                <code>{msg}</code>
              </li>
            ))}
          </ul>
        </div>
        <div className="get-started-card">
          <h3>What happens next</h3>
          <ol className="get-started-steps-inline">
            <li>You get a reply confirming saved preferences.</li>
            <li>
              Macro alerts arrive when headlines match your keywords, watchlist,
              severity, and source trust.
            </li>
            <li>
              Watchlist changes can take a few seconds to sync to the news engine.
            </li>
          </ol>
        </div>
      </div>

      <aside className="get-started-requirements" aria-label="Requirements">
        <h3>Requirements</h3>
        <ul>
          <li>
            <strong>iMessage only</strong> — blue bubble from an iPhone, iPad, or Mac.
            SMS (green bubble) is not supported.
          </li>
          <li>
            <strong>Plain text</strong> — preferences and follow-ups; no slash commands.
          </li>
          <li>
            <strong>Shared Photon line?</strong> Link the user&apos;s sending number to
            your project in the Photon dashboard so inbound texts reach the agent.
          </li>
        </ul>
      </aside>
    </div>
  );
}
