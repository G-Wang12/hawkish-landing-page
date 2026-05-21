import { toE164 } from "./phone";

export type PhotonUserType = "shared" | "dedicated" | "auto";

export type PhotonEnv = {
  projectId: string;
  projectSecret: string;
  userType: PhotonUserType;
  /** Required for dedicated; optional for shared (unused). */
  assignedPhoneNumber: string | null;
};

function parseUserType(raw: string | undefined): PhotonUserType {
  const value = raw?.trim().toLowerCase();
  if (value === "dedicated" || value === "auto") return value;
  return "shared";
}

export function getPhotonEnv(
  env: Record<string, string | undefined>
): PhotonEnv | { error: string } {
  const projectId = env.PHOTON_PROJECT_ID?.trim();
  const projectSecret = env.PHOTON_PROJECT_SECRET?.trim();
  const userType = parseUserType(env.PHOTON_USER_TYPE);

  if (!projectId) {
    return { error: "PHOTON_PROJECT_ID is not set" };
  }
  if (!projectSecret) {
    return { error: "PHOTON_PROJECT_SECRET is not set" };
  }

  const assignedRaw =
    env.PHOTON_ASSIGNED_PHONE_NUMBER?.trim() ||
    env.VITE_IMESSAGE_NUMBER?.trim();

  let assignedPhoneNumber: string | null = null;
  if (assignedRaw) {
    assignedPhoneNumber = toE164(assignedRaw);
    if (!assignedPhoneNumber) {
      return { error: "Assigned iMessage line is not a valid E.164 number" };
    }
  }

  if (userType === "dedicated" && !assignedPhoneNumber) {
    return {
      error:
        "PHOTON_ASSIGNED_PHONE_NUMBER (or VITE_IMESSAGE_NUMBER) is required for dedicated users",
    };
  }

  return {
    projectId,
    projectSecret,
    userType,
    assignedPhoneNumber,
  };
}
