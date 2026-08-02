"use client";

import { useState, useEffect, useCallback } from "react";

// ── Tipos ─────────────────────────────────────────────────────────────────────

type FilterDef = {
  field: string;
  label: string;
  type: "bool" | "text" | "select";
  options?: string[];
};
type CollectionDef = {
  id: string;
  label: string;
  icon: string;
  filters: FilterDef[];
};
type Doc = Record<string, unknown>;

// ── Config de colecciones ─────────────────────────────────────────────────────

const COLLECTIONS: CollectionDef[] = [
  {
    id: "users", label: "Usuarios", icon: "👤",
    filters: [
      { field: "isSuspended", label: "Suspendido", type: "bool" },
    ],
  },
  {
    id: "stores", label: "Tiendas", icon: "🏪",
    filters: [
      { field: "status", label: "Estado", type: "select", options: ["approved", "pending", "rejected", "suspended"] },
      { field: "isVerified", label: "Verificado", type: "bool" },
      { field: "isSuspended", label: "Suspendido", type: "bool" },
      { field: "isFounder", label: "Fundador", type: "bool" },
    ],
  },
  {
    id: "products", label: "Productos", icon: "📦",
    filters: [
      { field: "isAvailable", label: "Disponible", type: "bool" },
      { field: "category", label: "Categoría", type: "text" },
      { field: "storeId", label: "Store ID", type: "text" },
    ],
  },
  {
    id: "orders", label: "Pedidos", icon: "🛒",
    filters: [
      { field: "status", label: "Estado", type: "select", options: ["pending", "payment_uploaded", "confirmed", "paid", "shipped", "delivered", "cancelled", "disputed"] },
      { field: "storeId", label: "Store ID", type: "text" },
      { field: "clientId", label: "Cliente ID", type: "text" },
    ],
  },
  { id: "chats", label: "Chats", icon: "💬", filters: [] },
  {
    id: "coupons", label: "Cupones", icon: "🎟️",
    filters: [
      { field: "isActive", label: "Activo", type: "bool" },
      { field: "storeId", label: "Store ID", type: "text" },
    ],
  },
  {
    id: "reviews", label: "Reseñas", icon: "⭐",
    filters: [{ field: "storeId", label: "Store ID", type: "text" }],
  },
  { id: "loyalty_cards", label: "Tarjetas Lealtad", icon: "🎫", filters: [] },
  { id: "loyalty", label: "Loyalty (legacy)", icon: "🏅", filters: [] },
  { id: "caja_sessions", label: "Sesiones Caja", icon: "🏦", filters: [] },
  { id: "caja_movimientos", label: "Movimientos Caja", icon: "💰", filters: [] },
  { id: "product_catalog", label: "Catálogo", icon: "📋", filters: [] },
  {
    id: "notifications", label: "Notificaciones", icon: "🔔",
    filters: [
      { field: "read", label: "Leída", type: "bool" },
      { field: "userId", label: "Usuario ID", type: "text" },
    ],
  },
  {
    id: "reservations", label: "Reservaciones", icon: "📅",
    filters: [
      { field: "status", label: "Estado", type: "select", options: ["pending", "confirmed", "cancelled", "completed"] },
    ],
  },
  {
    id: "disputes", label: "Disputas", icon: "⚠️",
    filters: [
      { field: "status", label: "Estado", type: "select", options: ["open", "resolved", "closed"] },
    ],
  },
  {
    id: "feed_posts", label: "Feed Posts", icon: "📰",
    filters: [{ field: "storeId", label: "Store ID", type: "text" }],
  },
  { id: "favorites", label: "Favoritos", icon: "❤️", filters: [] },
  { id: "app_config", label: "App Config", icon: "⚙️", filters: [] },
  { id: "beta_testers", label: "Beta Testers", icon: "🧪", filters: [] },
];

// ── Utilidades ────────────────────────────────────────────────────────────────

function formatCell(val: unknown): string {
  if (val === null || val === undefined) return "—";
  if (typeof val === "boolean") return val ? "✅ sí" : "❌ no";
  if (typeof val === "string") {
    // Fechas ISO — formatear legibles
    if (/^\d{4}-\d{2}-\d{2}T/.test(val)) {
      return new Date(val).toLocaleString("es-VE", { dateStyle: "short", timeStyle: "short" });
    }
    return val.length > 60 ? val.slice(0, 60) + "…" : val;
  }
  if (typeof val === "number") return val.toLocaleString("es-VE");
  if (Array.isArray(val)) return `[${val.length} items]`;
  if (typeof val === "object") {
    const str = JSON.stringify(val);
    return str.length > 70 ? str.slice(0, 70) + "…" : str;
  }
  return String(val);
}

function exportCSV(docs: Doc[], filename: string) {
  if (!docs.length) return;
  const keys = Array.from(new Set(docs.flatMap((d) => Object.keys(d))));
  const escape = (v: unknown) => {
    const s = formatCell(v).replace(/"/g, '""');
    return `"${s}"`;
  };
  const header = keys.map((k) => `"${k}"`).join(",");
  const rows = docs.map((d) => keys.map((k) => escape(d[k])).join(","));
  const csv = [header, ...rows].join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Pantalla de contraseña ────────────────────────────────────────────────────

function PasswordScreen({ onSuccess }: { onSuccess: () => void }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/panel-datos/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      if (res.ok) {
        onSuccess();
      } else {
        setError("Contraseña incorrecta.");
        setPwd("");
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "#0A0A1A" }}>
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <p className="text-3xl font-extrabold text-white tracking-wider mb-1">
            COMPR<span style={{ background: "linear-gradient(90deg,#6C3FC7,#4FACFE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>APP</span>
          </p>
          <p className="text-slate-400 text-sm mt-1">Panel de Datos — Acceso Restringido</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 32 }}>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Contraseña</label>
            <input
              type="password"
              value={pwd}
              onChange={(e) => { setPwd(e.target.value); setError(""); }}
              placeholder="••••••••"
              autoFocus
              required
              disabled={loading}
              className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1.5px solid rgba(108,63,199,0.4)" }}
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(90deg,#6C3FC7,#4FACFE)", boxShadow: "0 4px 24px rgba(108,63,199,0.35)", opacity: loading ? 0.7 : 1 }}
          >
            {loading && <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {loading ? "Verificando…" : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Explorador de datos ───────────────────────────────────────────────────────

function DataExplorer() {
  const [selected, setSelected] = useState(COLLECTIONS[0].id);
  const [search, setSearch] = useState("");
  const [filterField, setFilterField] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(0);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const colDef = COLLECTIONS.find((c) => c.id === selected)!;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        ...(search && { search }),
        ...(filterField && filterValue !== "" && { filterField, filterValue }),
      });
      const res = await fetch(`/api/panel-datos/${selected}?${params}`);
      if (!res.ok) throw new Error((await res.json()).error || "Error");
      const data = await res.json();
      setDocs(data.docs);
      setTotal(data.total);
      setHasMore(data.hasMore);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }, [selected, search, filterField, filterValue, page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Al cambiar colección, resetear filtros y página
  const switchCollection = (id: string) => {
    setSelected(id);
    setSearch("");
    setFilterField("");
    setFilterValue("");
    setPage(0);
  };

  // Columnas dinámicas: union de keys de todos los docs de la página actual
  const columns = docs.length
    ? Array.from(new Set(docs.flatMap((d) => Object.keys(d))))
    : [];

  const filterDef = colDef.filters.find((f) => f.field === filterField);

  return (
    <div className="min-h-screen flex" style={{ background: "#F8F9FB", fontFamily: "system-ui,sans-serif" }}>

      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-slate-200 bg-white flex flex-col" style={{ minHeight: "100vh" }}>
        <div className="px-4 py-5 border-b border-slate-100">
          <p className="font-extrabold text-slate-900 text-sm tracking-tight">
            COMPR<span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">APP</span>
          </p>
          <p className="text-xs text-slate-400 mt-0.5">Panel de Datos</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {COLLECTIONS.map((col) => (
            <button
              key={col.id}
              onClick={() => switchCollection(col.id)}
              className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors"
              style={{
                background: selected === col.id ? "rgba(108,63,199,0.08)" : "transparent",
                color: selected === col.id ? "#6C3FC7" : "#475569",
                fontWeight: selected === col.id ? 600 : 400,
                borderRight: selected === col.id ? "3px solid #6C3FC7" : "3px solid transparent",
              }}
            >
              <span>{col.icon}</span>
              <span className="truncate">{col.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Panel principal */}
      <main className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="font-bold text-slate-900 text-base">
              {colDef.icon} {colDef.label}
            </h1>
            {!loading && (
              <p className="text-xs text-slate-400 mt-0.5">
                {total} documento{total !== 1 ? "s" : ""} encontrado{total !== 1 ? "s" : ""}
                {page > 0 || hasMore ? ` · Página ${page + 1}` : ""}
              </p>
            )}
          </div>
          <button
            onClick={() => exportCSV(docs, `${selected}_p${page + 1}.csv`)}
            disabled={!docs.length}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-all disabled:opacity-40"
            style={{ borderColor: "#6C3FC7", color: "#6C3FC7" }}
          >
            ⬇️ Exportar CSV
          </button>
        </div>

        {/* Barra de búsqueda + filtros */}
        <div className="bg-white border-b border-slate-100 px-6 py-3 flex flex-wrap gap-3 items-end">
          {/* Búsqueda libre */}
          <div className="flex-1 min-w-48">
            <input
              type="text"
              placeholder="Buscar en todos los campos…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(0); }}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50"
            />
          </div>

          {/* Selector de filtro */}
          {colDef.filters.length > 0 && (
            <>
              <div>
                <select
                  value={filterField}
                  onChange={(e) => { setFilterField(e.target.value); setFilterValue(""); setPage(0); }}
                  className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="">— Filtrar por —</option>
                  {colDef.filters.map((f) => (
                    <option key={f.field} value={f.field}>{f.label}</option>
                  ))}
                </select>
              </div>

              {/* Valor del filtro */}
              {filterField && filterDef && (
                <div>
                  {filterDef.type === "bool" ? (
                    <select
                      value={filterValue}
                      onChange={(e) => { setFilterValue(e.target.value); setPage(0); }}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="">Todos</option>
                      <option value="true">✅ Sí</option>
                      <option value="false">❌ No</option>
                    </select>
                  ) : filterDef.type === "select" ? (
                    <select
                      value={filterValue}
                      onChange={(e) => { setFilterValue(e.target.value); setPage(0); }}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="">Todos</option>
                      {filterDef.options?.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder={`Valor de ${filterDef.label}…`}
                      value={filterValue}
                      onChange={(e) => { setFilterValue(e.target.value); setPage(0); }}
                      className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-400 w-48"
                    />
                  )}
                </div>
              )}

              {(filterField || search) && (
                <button
                  onClick={() => { setSearch(""); setFilterField(""); setFilterValue(""); setPage(0); }}
                  className="text-xs text-slate-400 hover:text-red-500 transition-colors px-2 py-2"
                >
                  ✕ Limpiar
                </button>
              )}
            </>
          )}
        </div>

        {/* Tabla */}
        <div className="flex-1 overflow-auto">
          {loading && (
            <div className="flex items-center justify-center h-40">
              <div className="w-6 h-6 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="m-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              ❌ {error}
            </div>
          )}

          {!loading && !error && docs.length === 0 && (
            <div className="flex flex-col items-center justify-center h-40 text-slate-400 text-sm">
              <p>Sin resultados para los filtros actuales.</p>
            </div>
          )}

          {!loading && !error && docs.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr style={{ background: "#F1F5F9", position: "sticky", top: 0, zIndex: 10 }}>
                    {columns.map((col) => (
                      <th
                        key={col}
                        className="text-left px-3 py-2.5 font-semibold text-slate-600 border-b border-slate-200 whitespace-nowrap"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {docs.map((doc, i) => (
                    <tr
                      key={doc._id as string || i}
                      className="border-b border-slate-100 hover:bg-purple-50/40 transition-colors"
                    >
                      {columns.map((col) => (
                        <td
                          key={col}
                          className="px-3 py-2 text-slate-700 max-w-xs"
                          style={{ maxWidth: 260 }}
                          title={col === "_id" ? String(doc[col] ?? "") : JSON.stringify(doc[col])}
                        >
                          <span className="block truncate">{formatCell(doc[col])}</span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Paginación */}
        {!loading && (page > 0 || hasMore) && (
          <div className="bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between gap-4">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 hover:border-purple-400 hover:text-purple-600 disabled:opacity-40 transition-all"
            >
              ← Anterior
            </button>
            <span className="text-xs text-slate-500">
              Página {page + 1} · mostrando {docs.length} de {total}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasMore}
              className="px-4 py-2 rounded-lg text-xs font-semibold border border-slate-200 hover:border-purple-400 hover:text-purple-600 disabled:opacity-40 transition-all"
            >
              Siguiente →
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

// ── Página principal ──────────────────────────────────────────────────────────

export default function PanelDatosPage() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  // Al cargar, verificar si hay cookie de sesión válida en el servidor
  useEffect(() => {
    fetch("/api/panel-datos/auth")
      .then((res) => setIsAuth(res.ok))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A1A" }}>
        <div className="w-6 h-6 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuth) {
    return <PasswordScreen onSuccess={() => setIsAuth(true)} />;
  }

  return <DataExplorer />;
}
