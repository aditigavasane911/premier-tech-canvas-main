/**
 * Shared config constants.
 *
 * API_BASE defaults to the local development backend and can be overridden
 * for production builds via the VITE_API_URL environment variable
 * (see `.env.example`).
 */
export const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/";

export const API_BASE = import.meta.env["VITE_API_URL"] ?? "http://localhost:5000";
