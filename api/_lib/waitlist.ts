import { getPhotonEnv } from "./env.js";
import { createProjectUser } from "./photon.js";
import { toE164 } from "./phone.js";

export type WaitlistBody = {
  phone?: string;
  email?: string;
};

export type WaitlistSuccessBody = {
  ok: true;
  /** E.164 line to text after signup (shared pool or dedicated line). */
  textLine?: string;
};

export type WaitlistResult =
  | { status: 200; body: WaitlistSuccessBody }
  | { status: number; body: { ok: false; error: string } };

export async function handleWaitlistSignup(
  env: Record<string, string | undefined>,
  input: WaitlistBody
): Promise<WaitlistResult> {
  const phoneRaw = input.phone?.trim();
  if (!phoneRaw) {
    return {
      status: 400,
      body: { ok: false, error: "phone is required" },
    };
  }

  const phoneNumber = toE164(phoneRaw);
  if (!phoneNumber) {
    return {
      status: 400,
      body: { ok: false, error: "Enter a valid iMessage phone number" },
    };
  }

  const email = input.email?.trim() || undefined;
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      status: 400,
      body: { ok: false, error: "Invalid email address" },
    };
  }

  const photonEnv = getPhotonEnv(env);
  if ("error" in photonEnv) {
    console.error("[waitlist]", photonEnv.error);
    return {
      status: 503,
      body: { ok: false, error: "Signup is temporarily unavailable" },
    };
  }

  const result = await createProjectUser(photonEnv, {
    phoneNumber,
    email,
  });

  if (result.ok) {
    return {
      status: 200,
      body: {
        ok: true,
        ...(result.textLine ? { textLine: result.textLine } : {}),
      },
    };
  }

  console.error("[waitlist] Photon:", result.status, result.detail);

  if (result.status === 401 || result.status === 403) {
    return {
      status: 503,
      body: { ok: false, error: "Signup is temporarily unavailable" },
    };
  }

  if (result.status === 404 && /no dedicated imessage line/i.test(result.detail)) {
    return {
      status: 503,
      body: {
        ok: false,
        error:
          "This project has no dedicated iMessage line. Set PHOTON_USER_TYPE=shared in .env (Pro plan) or add a Business line.",
      },
    };
  }

  if (result.status === 409 || result.status === 422) {
    return {
      status: 400,
      body: {
        ok: false,
        error:
          "We couldn't add this number. Check the number or contact support.",
      },
    };
  }

  return {
    status: 502,
    body: { ok: false, error: "Something went wrong. Try again in a moment." },
  };
}
