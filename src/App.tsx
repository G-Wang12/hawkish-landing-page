import { GetStarted } from "./components/GetStarted";
import { formatPhoneDisplay, iMessageNumber } from "./config";
import "./App.css";

const features = [
  {
    title: "Plain-English preferences",
    body: "Text what you care about — CPI, FOMC, Powell, your watchlist. No slash commands. The agent remembers and updates incrementally for your chat.",
  },
  {
    title: "Stock watchlist",
    body: "Watch TSLA, NVDA, or any ticker. Headlines mentioning your names are filtered in real time and scored for impact.",
  },
  {
    title: "Source trust scoring",
    body: "Every alert labels publisher credibility — Reuters high, aggregators low. Set a minimum trust bar so noise never pings you.",
  },
  {
    title: "Severity you control",
    body: "Tune a 0–1 threshold: lower means more alerts, higher means only market-moving headlines break through.",
  },
  {
    title: "Threaded follow-ups",
    body: "Reply “Why is this hawkish?” or “Summarize the report” in the same chat. Get Grok analysis on the alert you just received.",
  },
  {
    title: "Live macro wire",
    body: "A dedicated news engine streams filtered headlines; the agent analyzes and routes only what matches your settings.",
  },
];

const steps = [
  {
    n: "01",
    title: "Text our iMessage line",
    body: `Open Messages and text ${formatPhoneDisplay(iMessageNumber)}. Blue bubble only — not SMS.`,
  },
  {
    n: "02",
    title: "Say what you want",
    body: "No signup keyword — e.g. “Alert me on CPI and FOMC, watch NVDA, threshold 0.5.” You get a confirmation reply with your current settings.",
  },
  {
    n: "03",
    title: "Get proactive alerts",
    body: "When macro news matches your filters with enough severity and source trust, your phone buzzes. Reply in-thread to dig deeper.",
  },
];

export default function App() {
  return (
    <>
      <div className="bg-grid" aria-hidden="true" />
      <div className="bg-glow bg-glow--tl" aria-hidden="true" />
      <div className="bg-glow bg-glow--br" aria-hidden="true" />

      <header className="site-header">
        <a href="#" className="logo">
          <span className="logo-mark" aria-hidden="true" />
          Hawkish
        </a>
        <nav className="site-nav">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#get-started" className="nav-cta">
            Get started
          </a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Macro intelligence · iMessage</p>
            <h1>
              The headlines that move markets,
              <em> in your Messages app</em>
            </h1>
            <p className="hero-lead">
              Hawkish watches CPI, the Fed, your tickers, and the stories you care
              about — then texts you when severity and source trust clear your bar.
              Text the line to start; no app install and no web account.
            </p>
            <div className="hero-cta">
              <a href="#get-started" className="btn btn-primary">
                Text us on iMessage
              </a>
              <a href="#how-it-works" className="btn btn-ghost">
                See how it works
              </a>
            </div>
          </div>

          <div className="hero-preview" aria-label="Example alert conversation">
            <div className="phone-frame">
              <div className="phone-header">
                <span className="phone-back" />
                <span className="phone-contact">Hawkish</span>
              </div>
              <div className="bubble bubble--out">
                Alert me on CPI and FOMC, watch NVDA, threshold 0.5
              </div>
              <div className="bubble bubble--in">
                <span className="bubble-label">Hawkish</span>
                Got it — saved your macro preferences.
                <br />
                Tracked: CPI, FOMC · Watchlist: NVDA · Threshold: 0.5
              </div>
              <div className="bubble bubble--in bubble--alert">
                <span className="bubble-label">Macro alert</span>
                Fed holds rates; signals higher-for-longer stance
                <span className="bubble-meta">
                  Source: Reuters · trust high (0.95)
                  <br />
                  Severity: 0.90 · Sentiment: bearish
                </span>
              </div>
              <div className="bubble bubble--out">
                Why is this hawkish?
              </div>
              <div className="bubble bubble--in">
                <span className="bubble-label">Hawkish</span>
                Higher-for-longer guidance tightens financial conditions…
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="section features">
          <div className="section-head">
            <p className="eyebrow">Built for macro traders &amp; PMs</p>
            <h2>Everything you need, nothing you don&apos;t</h2>
            <p>
              A C++ news engine filters the firehose. A TypeScript agent scores
              each headline with Grok and routes alerts per chat — over iMessage.
              Each thread is its own user; no separate signup API.
            </p>
          </div>
          <ul className="feature-grid">
            {features.map((f) => (
              <li key={f.title} className="feature-card">
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="section messaging">
          <div className="messaging-copy">
            <p className="eyebrow">Talk like a human</p>
            <h2>No commands. Just text.</h2>
            <p>
              Add keywords, watch tickers, raise your threshold, or filter to
              reputable sources — in one message or across a conversation.
              Settings merge incrementally; a bad parse won&apos;t wipe what you
              saved.
            </p>
            <ul className="phrase-list">
              <li>
                <code>Alert me on CPI and FOMC, threshold 0.5</code>
              </li>
              <li>
                <code>Watch TSLA and NVDA for me</code>
              </li>
              <li>
                <code>Only alert me from reputable sources</code>
              </li>
              <li>
                <code>Why is this hawkish?</code>
              </li>
            </ul>
          </div>
          <div className="stat-panel">
            <div className="stat">
              <span className="stat-value">30m</span>
              <span className="stat-label">Follow-up window after each alert</span>
            </div>
            <div className="stat">
              <span className="stat-value">0–1</span>
              <span className="stat-label">Severity &amp; source-trust thresholds</span>
            </div>
            <div className="stat">
              <span className="stat-value">Per chat</span>
              <span className="stat-label">Your own keywords, watchlist &amp; thresholds</span>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="section steps">
          <div className="section-head section-head--center">
            <p className="eyebrow">How it works</p>
            <h2>From first text to your first alert</h2>
            <p className="section-head-sub">
              The landing page doesn&apos;t register you — texting the line does.
              Spectrum delivers your thread to the agent; preferences are saved for
              that conversation.
            </p>
          </div>
          <ol className="step-list">
            {steps.map((s) => (
              <li key={s.n} className="step-card">
                <span className="step-num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="get-started" className="section get-started-section">
          <div className="get-started-inner">
            <p className="eyebrow">Get started</p>
            <h2>Text the line. You&apos;re in.</h2>
            <p className="get-started-lead">
              No web signup, invite code, or <code>REGISTER</code> message. Anyone
              who can iMessage the public line can set preferences on first contact
              and receive alerts when news matches.
            </p>
            <GetStarted />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span className="footer-brand">Hawkish</span>
        <p>Macro alert agent · Photon Spectrum · iMessage</p>
        <p className="footer-copy">
          © {new Date().getFullYear()} Hawkish. All rights reserved.
        </p>
      </footer>
    </>
  );
}
