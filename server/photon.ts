import type { PhotonEnv } from "./env";

const SPECTRUM_BASE = "https://spectrum.photon.codes";

export type CreateUserInput = {
  phoneNumber: string;
  email?: string;
};

export type CreateUserSuccess = {
  ok: true;
  /** Line the user should text (from Photon). Present for shared users. */
  textLine?: string;
};

export type CreateUserFailure = {
  ok: false;
  status: number;
  detail: string;
};

type PhotonUserRecord = {
  assignedPhoneNumber?: string;
};

type PhotonCreateResponse = {
  succeed?: boolean;
  data?: PhotonUserRecord;
  message?: string;
  error?: string;
};

function basicAuth(projectId: string, projectSecret: string): string {
  return Buffer.from(`${projectId}:${projectSecret}`, "utf8").toString(
    "base64"
  );
}

async function postUser(
  config: PhotonEnv,
  body: Record<string, string>
): Promise<CreateUserSuccess | CreateUserFailure> {
  const url = `${SPECTRUM_BASE}/projects/${config.projectId}/users/`;

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth(config.projectId, config.projectSecret)}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return { ok: false, status: 502, detail: message };
  }

  let json: PhotonCreateResponse = {};
  try {
    json = (await res.json()) as PhotonCreateResponse;
  } catch {
    /* ignore */
  }

  if (res.ok && json.succeed) {
    const line = json.data?.assignedPhoneNumber?.trim();
    return { ok: true, textLine: line || undefined };
  }

  let detail = `Photon API returned ${res.status}`;
  if (json.message) detail = String(json.message);
  else if (json.error) detail = String(json.error);

  return { ok: false, status: res.status, detail };
}

/** Pro / managed shared: allowlist the user's phone; Photon assigns their line. */
export async function createSharedUser(
  config: PhotonEnv,
  input: CreateUserInput
): Promise<CreateUserSuccess | CreateUserFailure> {
  const body: Record<string, string> = {
    type: "shared",
    phoneNumber: input.phoneNumber,
  };
  if (input.email) body.email = input.email;
  return postUser(config, body);
}

/** Business+ dedicated line: link user to your project-owned iMessage number. */
export async function createDedicatedUser(
  config: PhotonEnv,
  input: CreateUserInput
): Promise<CreateUserSuccess | CreateUserFailure> {
  if (!config.assignedPhoneNumber) {
    return {
      ok: false,
      status: 503,
      detail: "assignedPhoneNumber is required for dedicated users",
    };
  }

  const body: Record<string, string> = {
    type: "dedicated",
    phoneNumber: input.phoneNumber,
    assignedPhoneNumber: config.assignedPhoneNumber,
  };
  if (input.email) body.email = input.email;
  const result = await postUser(config, body);
  if (result.ok && !result.textLine) {
    return { ok: true, textLine: config.assignedPhoneNumber };
  }
  return result;
}

const NO_DEDICATED_LINE = /no dedicated imessage line/i;

export async function createProjectUser(
  config: PhotonEnv,
  input: CreateUserInput
): Promise<CreateUserSuccess | CreateUserFailure> {
  if (config.userType === "shared") {
    return createSharedUser(config, input);
  }

  const dedicated = await createDedicatedUser(config, input);
  if (dedicated.ok) return dedicated;

  if (
    config.userType === "auto" &&
    dedicated.status === 404 &&
    NO_DEDICATED_LINE.test(dedicated.detail)
  ) {
    console.warn(
      "[waitlist] No dedicated line on project — falling back to shared user"
    );
    return createSharedUser(config, input);
  }

  return dedicated;
}
