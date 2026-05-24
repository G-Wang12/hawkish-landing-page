import { GetStarted } from "./components/GetStarted";
import { defaultStarterMessage, firstMessageExamples } from "./config";
import "./App.css";

const features = [
  {
    title: "Plain-English preferences",
    body: "Text keywords, tickers, and thresholds in plain English — no commands or signup keyword. Settings merge incrementally per chat.",
  },
  {
    title: "Stock watchlist",
    body: "Name any tickers to watch. Headlines mentioning those names are filtered in real time and scored for impact.",
  },
  {
    title: "Source trust scoring",
    body: "Every alert labels publisher credibility — wire services high, aggregators low. Set a minimum trust bar so noise never pings you.",
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
    body: "A C++ news engine streams filtered headlines; the agent analyzes and routes only what matches your settings.",
  },
];

const steps = [
  {
    n: "01",
    title: "Request access",
    body: "Submit the phone number you use on iMessage. We link it in Photon so your texts reach Hawkish (required on shared plans).",
  },
  {
    n: "02",
    title: "Text your Hawkish line",
    body: "Open Messages and text the line from signup — same phone you registered. No REGISTER or START keyword needed.",
  },
  {
    n: "03",
    title: "Set preferences",
    body: "Say what you want in plain English — topics, tickers, severity, source trust. Blue bubble only; SMS is not supported.",
  },
  {
    n: "04",
    title: "Get macro alerts",
    body: "You get a confirmation reply when prefs are saved; alerts follow when headlines match your keywords, watchlist, and thresholds.",
  },
];

const phraseExamples = [
  firstMessageExamples[0],
  firstMessageExamples[1],
  "Only alert me from reputable sources, threshold [0.7]",
  "Why is this hawkish?",
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
            Request access
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
              Hawkish watches the topics and tickers you choose — then texts you
              when severity and source trust clear your bar. Request access first
              so Photon routes your iMessage; then text preferences in plain
              English on your first message.
            </p>
            <div className="hero-cta">
              <a href="#get-started" className="btn btn-primary">
                Request access
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
                {defaultStarterMessage}
              </div>
              <div className="bubble bubble--in">
                <span className="bubble-label">Hawkish</span>
                Got it — saved your macro preferences for this chat.
                <br />
                Tracked keywords: CPI, FOMC · Watchlist: NVDA · Threshold: 0.5
                <br />
                Source trust: any source
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
              each headline with Grok and routes alerts per chat — over iMessage,
              once Photon delivers your texts to the agent.
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
              Your first text can set preferences — no signup keyword. Add keywords,
              watch tickers, raise your threshold, or filter to reputable sources
              in one message or across a conversation. Settings merge incrementally;
              a bad parse won&apos;t wipe what you saved.
            </p>
            <ul className="phrase-list">
              {phraseExamples.map((phrase) => (
                <li key={phrase}>
                  <code>{phrase}</code>
                </li>
              ))}
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
            <h2>From request to your first alert</h2>
            <p className="section-head-sub">
              Photon must route your iMessage to our agent before Hawkish can reply.
              Request access here to link your number (shared plans), then text
              preferences in plain English — no magic word required.
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
            <h2>Request access, then text the line</h2>
            <p className="get-started-lead">
              Submit the phone you&apos;ll use on iMessage. Signup links your number
              in Photon and shows the line to text — then send preferences in plain
              English on your first message. Texting before signup won&apos;t reach
              Hawkish (Photon&apos;s gate, not the agent).
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
