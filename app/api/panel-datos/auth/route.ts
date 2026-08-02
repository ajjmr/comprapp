import { NextRequest, NextResponse } from "next/server";
import {
  createSessionToken,
  isSessionValid,
  sessionCookieOptions,
} from "@/lib/panel-session";

// GET — verificar si la sesión actual es válida (usada por el page al cargar)
export async function GET() {
  const valid = await isSessionValid();
  if (!valid) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true });
}

// POST — validar contraseña y emitir cookie de sesión
export async function POST(request: NextRequest) {
  const password = process.env.DATA_PANEL_PASSWORD;
  if (!password) {
    return NextResponse.json(
      { error: "Panel no configurado" },
      { status: 500 }
    );
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  if (!body.password || body.password !== password) {
    // Pequeño delay para dificultar ataques de fuerza bruta
    await new Promise((r) => setTimeout(r, 300));
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  const token = createSessionToken();
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set(sessionCookieOptions(token));
  return response;
}
