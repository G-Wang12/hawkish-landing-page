# Hawkish landing page

Static marketing site for **Hawkish** — macro news alerts over iMessage. Pairs with the macro-alert-ai-agent repo; users **text the line** to start (no web signup required).

## Stack

- React 19 + TypeScript
- Vite (static build → `dist/`)

## Develop

```bash
npm install
cp .env.example .env   # then set VITE_IMESSAGE_NUMBER to your real Photon line
npm run dev
```

If `npm run dev` fails with “Missing VITE_IMESSAGE_NUMBER”, you need a `.env` file (gitignored) — copy from `.env.example` and replace the placeholder number.

**After editing `.env`, restart the dev server** (Ctrl+C, then `npm run dev` again). Vite only reads env vars at startup. If the port was “in use”, an old server may still be serving the previous number — stop it or close that terminal tab, then start fresh.

Open [http://localhost:5173](http://localhost:5173).

## Configure

| Variable | Purpose |
| --- | --- |
| `VITE_IMESSAGE_NUMBER` | Number users text (dedicated line from `npm run info`, or Photon shared number) |

Build-time env only — rebuild after changing `.env`.

## Build & deploy

```bash
npm run build
npm run preview   # optional: serve dist locally
```

Deploy `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, etc.).

## Landing page ↔ agent

Recommended flow (see agent repo onboarding doc):

1. **CTA** — Text `VITE_IMESSAGE_NUMBER` on iMessage (blue bubble).
2. **First messages** — Examples on the page (CPI/FOMC, watchlist, threshold).
3. **Requirements** — iMessage only; shared-line users linked in Photon dashboard.
4. **No web registration** — First text creates the user session in the agent.

The site does not call the agent API unless you add web signup later.

## Customize

- Copy and sections: `src/App.tsx`
- Get started block: `src/components/GetStarted.tsx`
- Phone number env: `src/config.ts`
- Styles: `src/App.css`, `src/index.css`
