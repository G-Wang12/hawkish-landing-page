import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const iMessageNumber = env.VITE_IMESSAGE_NUMBER?.trim();

  if (command === "build" && !iMessageNumber) {
    throw new Error(
      "Missing VITE_IMESSAGE_NUMBER in .env — set your Photon iMessage line (see .env.example)."
    );
  }

  return {
    plugins: [react()],
  };
});
