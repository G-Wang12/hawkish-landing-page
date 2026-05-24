import { SignupForm } from "./SignupForm";

import { firstMessageExamples } from "../config";

const firstMessages = [...firstMessageExamples];

export function GetStarted() {
  return (
    <div className="get-started">
      <div className="get-started-signup">
        <SignupForm />
      </div>

      <div className="get-started-grid">
        <div className="get-started-card">
          <h3>First message ideas</h3>
          <p>
            No magic word — any plain-English preference phrase works on your first
            text. Replace the bracketed parts with what you want:
          </p>
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
            <li>
              Signup links your iMessage number in Photon so texts reach Hawkish
              (on shared plans, unlinked numbers hit Photon&apos;s gate).
            </li>
            <li>
              Text your Hawkish line in plain English — you get a confirmation
              reply with saved keywords, watchlist, and thresholds.
            </li>
            <li>
              Macro alerts arrive when headlines match your settings (severity and
              source trust included).
            </li>
            <li>
              Watchlist changes can take a few seconds to sync to the news engine.
              After an agent restart, text once to reload your preferences.
            </li>
          </ol>
        </div>
        <div className="get-started-card">
          <h3>Texted before you signed up?</h3>
          <p>
            A &ldquo;need to register&rdquo; reply is almost always{" "}
            <strong>Photon&apos;s gate</strong>, not Hawkish — your number
            wasn&apos;t linked to our project yet. Request access above first; the
            agent never sends that message.
          </p>
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
            <strong>Same phone as signup</strong> — text from the number you
            registered on shared plans; use the line shown after signup.
          </li>
          <li>
            <strong>Plain text</strong> — preferences and follow-ups; no slash
            commands or signup keyword.
          </li>
          <li>
            <strong>Be specific</strong> — empty topics and watchlist can match
            broadly; name what you care about in your first message.
          </li>
        </ul>
      </aside>
    </div>
  );
}
