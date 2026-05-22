# Hawkish landing page

Static marketing site for **Hawkish** — macro news alerts over iMessage. Pairs with the macro-alert-ai-agent repo.

Users **request access** with their iMessage phone number; signup calls Photon’s API to add them as a **dedicated** user on your line, then they text Hawkish on iMessage.

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

Open the URL Vite prints (usually http://localhost:5173). The signup form POSTs to `/api/waitlist`, which creates a dedicated Photon user for your Hawkish line.

## Configure

| Variable | Purpose |
| --- | --- |
| `VITE_IMESSAGE_NUMBER` | Optional display fallback; on Pro, each user gets their own line at signup (returned as `textLine`) |
| `PHOTON_PROJECT_ID` | Spectrum project id (dashboard → Settings) |
| `PHOTON_PROJECT_SECRET` | Spectrum project secret (server-only) |
| `PHOTON_USER_TYPE` | `shared` (Pro default), `dedicated` (Business line), or `auto` (try dedicated, fall back to shared) |
| `PHOTON_ASSIGNED_PHONE_NUMBER` | For `dedicated` only; defaults to `VITE_IMESSAGE_NUMBER` |
| `VITE_WAITLIST_URL` | Optional override for signup POST URL (default `/api/waitlist`) |

Pro plan supports up to **100** dedicated/shared users via the API.

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
2. **`/api/waitlist`** calls Photon’s create-user API. **Pro** uses `type: "shared"` (allowlist by phone; Photon returns the line to text). **Business** with a dedicated line can set `PHOTON_USER_TYPE=dedicated`.
3. User texts their **personal line** from signup (Pro/shared) or your dedicated Hawkish line (Business).
4. Agent handles prefs and alerts once Photon delivers `[iMessage]` events.

If someone texts before step 2 succeeds, Photon may show a registration gate — that is not Hawkish (`ts_agent` won’t log the message).

## Customize

- Copy and sections: `src/App.tsx`
- Signup + get started: `src/components/SignupForm.tsx`, `src/components/GetStarted.tsx`
- Photon API: `api/_lib/photon.ts`, `api/_lib/waitlist.ts`
- Phone display: `src/config.ts`
- Styles: `src/App.css`, `src/index.css`
