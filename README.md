# Hawkish landing page

Static marketing site for **Hawkish** — macro news alerts over iMessage. Pairs with the macro-alert-ai-agent repo.

Users **request access** with their iMessage phone number. Signup calls Photon’s API to link their sending number (required on **shared** plans) so texts reach the agent. After that, **any plain-English preference phrase** on the first iMessage starts a user session — no `REGISTER` or `START` keyword in the agent.

## Stack

- React 19 + TypeScript
- Vite (static build → `dist/`)
- `/api/waitlist` — Photon Spectrum user provisioning (Vite dev middleware + Vercel serverless)

## Develop

```bash
npm install
cp .env.example .env
# Set VITE_IMESSAGE_NUMBER, PHOTON_PROJECT_ID, PHOTON_PROJECT_SECRET
npm run dev
```

**After editing `.env`, restart the dev server** (Ctrl+C, then `npm run dev` again).

Open the URL Vite prints (usually http://localhost:5173). The signup form POSTs to `/api/waitlist`, which links the user’s phone in Photon.

## Configure

| Variable | Purpose |
| --- | --- |
| `VITE_IMESSAGE_NUMBER` | Display fallback; line users text on dedicated/Business plans |
| `PHOTON_PROJECT_ID` | Spectrum project id (dashboard → Settings) |
| `PHOTON_PROJECT_SECRET` | Spectrum project secret (server-only) |
| `PHOTON_USER_TYPE` | `shared` (Pro default), `dedicated` (Business line), or `auto` |
| `PHOTON_ASSIGNED_PHONE_NUMBER` | For `dedicated` only; defaults to `VITE_IMESSAGE_NUMBER` |
| `VITE_WAITLIST_URL` | Optional override for signup POST URL (default `/api/waitlist`) |

Pro plan supports up to **100** shared users via the API. Business with a dedicated line lets anyone text the stable agent number without per-phone linking in the dashboard.

## Build & deploy

```bash
npm run build
npm run preview   # serves /api/waitlist via the same Vite plugin
```

### Vercel (recommended)

Deploy the repo to Vercel. Set the same env vars in the project settings. `api/waitlist.ts` runs as a serverless function; `vercel.json` rewrites other routes to the SPA.

### Other static hosts

Host `dist/` only if you also deploy `/api/waitlist` somewhere (or set `VITE_WAITLIST_URL` to that endpoint). Do not expose `PHOTON_PROJECT_SECRET` in the browser.

## User flow (landing page ↔ Photon ↔ agent)

1. User submits **phone** (and optional email) on the site.
2. **`/api/waitlist`** calls Photon’s create-user API. **Pro/shared** links the sender’s phone so Photon delivers iMessage to the agent. **Business/dedicated** uses your stable line; strangers can text without dashboard linking.
3. User texts the Hawkish line from the phone they registered (shared) or your dedicated number (Business).
4. **First text = onboarding in the agent** — any preference phrase works; confirmation reply lists saved keywords, watchlist, and thresholds.
5. Macro alerts fire when headlines match settings (requires `cpp_engine` running and the user to have texted since the last agent restart).

If someone texts before step 2 succeeds on a shared plan, Photon may show a registration gate — that is **not** Hawkish (`ts_agent` won’t log the message).

## Starter message template

After signup, **Open in Messages** prefills a modular template from `src/config.ts`:

```text
Alert me on [your topics], watch [tickers], threshold [0.5]
```

Bracketed parts are placeholders for the user to replace before sending.

## Customize

- Copy and sections: `src/App.tsx`
- Signup + get started: `src/components/SignupForm.tsx`, `src/components/GetStarted.tsx`
- Starter template + examples: `src/config.ts`
- Photon API: `api/_lib/photon.ts`, `api/_lib/waitlist.ts`
- Styles: `src/App.css`, `src/index.css`
