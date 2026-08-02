import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "panel_session";
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 horas

function secret(): string {
  const s = process.env.PANEL_SESSION_SECRET;
  if (!s) throw new Error("PANEL_SESSION_SECRET no configurado");
  return s;
}

function sign(timestamp: number): string {
  return createHmac("sha256", secret())
    .update(`panel-session:${timestamp}`)
    .digest("hex");
}

export function createSessionToken(): string {
  const timestamp = Date.now();
  return `${timestamp}.${sign(timestamp)}`;
}

export function verifySessionToken(token: string): boolean {
  const dot = token.indexOf(".");
  if (dot === -1) return false;
  const timestamp = parseInt(token.slice(0, dot), 10);
  const sig = token.slice(dot + 1);
  if (isNaN(timestamp)) return false;
  if (Date.now() - timestamp > SESSION_DURATION_MS) return false;
  const expected = sign(timestamp);
  try {
    return timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"));
  } catch {
    return false;
  }
}

export async function isSessionValid(): Promise<boolean> {
  try {
    const jar = await cookies();
    const token = jar.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifySessionToken(token);
  } catch {
    return false;
  }
}

export function sessionCookieOptions(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  };
}
