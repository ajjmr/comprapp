import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import { Timestamp, Query, DocumentData } from "firebase-admin/firestore";
import { isSessionValid } from "@/lib/panel-session";

// Solo lectura — este endpoint nunca expone métodos de escritura.
// Bypasa Security Rules de Firestore via Admin SDK (acceso administrativo total).

const ALLOWED_COLLECTIONS = new Set([
  "users", "stores", "products", "orders", "chats", "coupons",
  "reviews", "loyalty_cards", "loyalty", "caja_sessions", "caja_movimientos",
  "product_catalog", "notifications", "reservations", "disputes",
  "feed_posts", "favorites", "app_config", "beta_testers",
  "shopping_lists", "recent_products",
]);

// Límite máximo de docs a traer de Firestore por request.
// Si la colección supera ~5k docs, migrar la búsqueda de texto a Algolia.
const MAX_FETCH = 500;
const PAGE_SIZE = 50;

function serialize(val: unknown): unknown {
  if (val instanceof Timestamp) return val.toDate().toISOString();
  if (Array.isArray(val)) return val.map(serialize);
  if (val && typeof val === "object")
    return Object.fromEntries(
      Object.entries(val as Record<string, unknown>).map(([k, v]) => [k, serialize(v)])
    );
  return val;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  // Verificar sesión antes de devolver cualquier dato
  const valid = await isSessionValid();
  if (!valid) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { collection } = await params;

  if (!ALLOWED_COLLECTIONS.has(collection)) {
    return NextResponse.json({ error: "Colección no permitida" }, { status: 400 });
  }

  const sp = request.nextUrl.searchParams;
  const search = sp.get("search")?.trim().toLowerCase() || "";
  const page = Math.max(0, parseInt(sp.get("page") || "0"));
  const filterField = sp.get("filterField") || "";
  const filterValue = sp.get("filterValue") ?? "";

  try {
    const db = adminDb();
    let query: Query<DocumentData> = db.collection(collection);

    // Filtro de campo único — Firestore lo ejecuta en el servidor
    if (filterField && filterValue !== "") {
      let val: string | boolean | number = filterValue;
      if (filterValue === "true") val = true;
      else if (filterValue === "false") val = false;
      else if (filterValue !== "" && !isNaN(Number(filterValue))) val = Number(filterValue);
      query = query.where(filterField, "==", val);
    }

    // Si hay búsqueda de texto, traemos más docs y filtramos en memoria
    const fetchLimit = search ? MAX_FETCH : PAGE_SIZE + 1 + page * PAGE_SIZE;
    const snapshot = await query.limit(fetchLimit).get();

    let docs = snapshot.docs.map((doc) => ({
      _id: doc.id,
      ...(serialize(doc.data()) as Record<string, unknown>),
    }));

    // Búsqueda de texto en memoria (JSON stringified)
    if (search) {
      docs = docs.filter((doc) =>
        JSON.stringify(doc).toLowerCase().includes(search)
      );
    }

    const total = docs.length;
    const offset = page * PAGE_SIZE;
    const pageData = docs.slice(offset, offset + PAGE_SIZE);

    return NextResponse.json({
      docs: pageData,
      total,
      page,
      pageSize: PAGE_SIZE,
      hasMore: offset + PAGE_SIZE < total,
    });
  } catch (err) {
    console.error("[panel-datos] error:", err);
    return NextResponse.json({ error: "Error al consultar Firestore" }, { status: 500 });
  }
}
