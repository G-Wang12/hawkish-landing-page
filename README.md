# Hawkish landing page

Static marketing site for **Hawkish** — macro news alerts over iMessage (companion to the [macro-alert-ai-agent](https://github.com) project).

## Stack

- React 19 + TypeScript
- Vite (static build → `dist/`)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # optional: serve dist locally
```

Deploy the `dist/` folder to any static host (Netlify, Vercel, Cloudflare Pages, S3, etc.).

## Waitlist signups

The signup form posts to `VITE_WAITLIST_URL` when set. Create `.env` from the example:

```bash
cp .env.example .env
```

Point `VITE_WAITLIST_URL` at your backend — e.g. [Formspree](https://formspree.io), a small API route, or Resend/ConvertKit webhook. Expected JSON body: `{ "email": "user@example.com" }`.

Without `VITE_WAITLIST_URL`, submit still shows a success state (useful for local demos); wire a real endpoint before production.

## Customize

- Copy and CTAs: `src/App.tsx`
- Signup behavior: `src/components/SignupForm.tsx`
- Styles: `src/App.css`, `src/index.css`
