import { SignupForm } from "./SignupForm";

const firstMessages = [
  "Alert me on CPI and FOMC, threshold 0.5",
  "Watch TSLA and NVDA for me",
  "Only big alerts, threshold 0.8",
];

export function GetStarted() {
  return (
    <div className="get-started">
      <div className="get-started-signup">
        <SignupForm />
      </div>

      <div className="get-started-grid">
        <div className="get-started-card">
          <h3>First message ideas</h3>
          <p>No special keyword — set preferences in plain English:</p>
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
              Signup links your iMessage number and gives you a{" "}
              <strong>personal Hawkish line</strong> to text (shown on
              confirmation).
            </li>
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
        <div className="get-started-card">
          <h3>Texted before you signed up?</h3>
          <p>
            A &ldquo;need to register&rdquo; reply is usually{" "}
            <strong>Photon&apos;s gate</strong>, not Hawkish — your number wasn&apos;t
            linked to our project yet. Request access above first.
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
            registered; each signup gets its own Hawkish line to message.
          </li>
          <li>
            <strong>Plain text</strong> — preferences and follow-ups; no slash commands.
          </li>
        </ul>
      </aside>
    </div>
  );
}
