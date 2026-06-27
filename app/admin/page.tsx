"use client";

import { useEffect, useState, useRef, ChangeEvent } from "react";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";
import { LandingConfig, DEFAULT_LANDING_CONFIG } from "@/lib/types/landing";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = "andersonjose@gmail.com";

const BANNER_COLORS = ["purple", "amber", "red", "green"] as const;
const BANNER_COLOR_LABELS: Record<string, string> = {
  purple: "Púrpura",
  amber: "Ámbar",
  red: "Rojo",
  green: "Verde",
};

// ── Helpers ───────────────────────────────────────────────
async function saveSection<K extends keyof LandingConfig>(
  section: K,
  data: LandingConfig[K]
) {
  await setDoc(doc(db, "landing_config", "content"), { [section]: data }, { merge: true });
}

async function uploadImage(file: File, slot: "image1" | "image2" | "image3"): Promise<string> {
  const storageRef = ref(storage, `landing/${slot}_${Date.now()}`);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}

// ── Sub-components ────────────────────────────────────────
function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-cyan-500 px-6 py-3">
        <h2 className="text-white font-bold text-sm uppercase tracking-widest">{title}</h2>
      </div>
      <div className="p-6 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50"
      />
    </div>
  );
}

function SaveButton({ onClick, saving }: { onClick: () => void; saving: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="mt-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:opacity-90 transition-all disabled:opacity-50"
    >
      {saving ? "Guardando…" : "Guardar cambios"}
    </button>
  );
}

// ── Main component ────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [config, setConfig] = useState<LandingConfig>(DEFAULT_LANDING_CONFIG);
  const [saving, setSaving] = useState<string | null>(null);
  const [uploadingSlot, setUploadingSlot] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const fileRefs = {
    image1: useRef<HTMLInputElement>(null),
    image2: useRef<HTMLInputElement>(null),
    image3: useRef<HTMLInputElement>(null),
  };

  // Auth guard
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u && u.email !== ADMIN_EMAIL) {
        signOut(auth);
        router.replace("/");
        return;
      }
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, [router]);

  // Load config once
  useEffect(() => {
    if (!user) return;
    getDoc(doc(db, "landing_config", "content")).then((snap) => {
      if (snap.exists()) {
        const data = snap.data() as Partial<LandingConfig>;
        setConfig({
          hero: { ...DEFAULT_LANDING_CONFIG.hero, ...data.hero },
          stats: { ...DEFAULT_LANDING_CONFIG.stats, ...data.stats },
          phones: { ...DEFAULT_LANDING_CONFIG.phones, ...data.phones },
          sellers: { ...DEFAULT_LANDING_CONFIG.sellers, ...data.sellers },
          buyers: { ...DEFAULT_LANDING_CONFIG.buyers, ...data.buyers },
          banner: { ...DEFAULT_LANDING_CONFIG.banner, ...data.banner },
        });
      }
    });
  }, [user]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const save = async (section: keyof LandingConfig) => {
    setSaving(section);
    try {
      await saveSection(section, config[section] as LandingConfig[typeof section]);
      showToast("✅ Guardado correctamente");
    } catch {
      showToast("❌ Error al guardar");
    } finally {
      setSaving(null);
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>, slot: "image1" | "image2" | "image3") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingSlot(slot);
    try {
      const url = await uploadImage(file, slot);
      setConfig((prev) => ({ ...prev, phones: { ...prev.phones, [slot]: url } }));
      await setDoc(doc(db, "landing_config", "content"), { phones: { ...config.phones, [slot]: url } }, { merge: true });
      showToast("✅ Imagen subida");
    } catch {
      showToast("❌ Error al subir imagen");
    } finally {
      setUploadingSlot(null);
      e.target.value = "";
    }
  };

  // ── Login screen ──────────────────────────────────────
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0A0A1A]">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A1A] gap-8">
        <div className="text-center">
          <p className="text-4xl font-extrabold text-white tracking-wider mb-1">
            COMPR<span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">APP</span>
          </p>
          <p className="text-slate-400 text-sm">Panel de administración</p>
        </div>
        <button
          onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
          className="flex items-center gap-3 bg-white text-slate-800 font-bold px-8 py-4 rounded-2xl shadow-2xl hover:bg-slate-100 transition-all text-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Ingresar con Google
        </button>
        <p className="text-slate-600 text-xs">Solo andersonjose@gmail.com puede acceder</p>
      </div>
    );
  }

  // ── Admin panel ───────────────────────────────────────
  const isSaving = (s: string) => saving === s;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl text-sm font-medium animate-fade-in">
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-5xl">
          <p className="font-extrabold text-slate-900 tracking-tight">
            COMPR<span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">APP</span>
            <span className="text-slate-400 font-normal text-sm ml-2">Admin</span>
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-slate-500 hidden sm:block">{user.email}</p>
            <button
              onClick={() => signOut(auth)}
              className="text-xs text-slate-500 hover:text-red-500 transition-colors font-semibold border border-slate-200 px-3 py-1.5 rounded-lg"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-5xl space-y-8">

        {/* A — Hero */}
        <SectionCard title="A — Hero">
          <Field label="Título principal" value={config.hero.title} onChange={(v) => setConfig((p) => ({ ...p, hero: { ...p.hero, title: v } }))} />
          <Field label="Subtítulo" value={config.hero.subtitle} onChange={(v) => setConfig((p) => ({ ...p, hero: { ...p.hero, subtitle: v } }))} />
          <Field label="Texto botón Play Store" value={config.hero.buttonPlayStore} onChange={(v) => setConfig((p) => ({ ...p, hero: { ...p.hero, buttonPlayStore: v } }))} />
          <Field label="Texto botón Web" value={config.hero.buttonWeb} onChange={(v) => setConfig((p) => ({ ...p, hero: { ...p.hero, buttonWeb: v } }))} />
          <SaveButton onClick={() => save("hero")} saving={isSaving("hero")} />
        </SectionCard>

        {/* B — Imágenes de teléfonos */}
        <SectionCard title="B — Imágenes de teléfonos">
          {(["image1", "image2", "image3"] as const).map((slot, idx) => (
            <div key={slot} className="border border-slate-100 rounded-xl p-4 space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                {idx === 0 ? "Imagen cliente (izquierda)" : idx === 1 ? "Imagen vendedor (derecha)" : "Imagen dashboard (centro)"}
              </p>
              <div className="flex gap-3 items-start">
                <input
                  type="text"
                  value={config.phones[slot]}
                  onChange={(e) => setConfig((p) => ({ ...p, phones: { ...p.phones, [slot]: e.target.value } }))}
                  placeholder="https://..."
                  className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-slate-50"
                />
                <input
                  ref={fileRefs[slot]}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageUpload(e, slot)}
                />
                <button
                  onClick={() => fileRefs[slot].current?.click()}
                  disabled={uploadingSlot === slot}
                  className="shrink-0 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-sm transition-all disabled:opacity-50"
                >
                  {uploadingSlot === slot ? "Subiendo…" : "📤 Subir"}
                </button>
              </div>
              {config.phones[slot] && (
                <div className="relative w-20 h-36 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <Image src={config.phones[slot]} alt={slot} fill className="object-cover" unoptimized />
                </div>
              )}
            </div>
          ))}
          <SaveButton onClick={() => save("phones")} saving={isSaving("phones")} />
        </SectionCard>

        {/* C — Estadísticas */}
        <SectionCard title="C — Estadísticas">
          <Field label="Número de tiendas" value={config.stats.stores} onChange={(v) => setConfig((p) => ({ ...p, stats: { ...p.stats, stores: v } }))} placeholder="100+" />
          <Field label="Número de usuarios" value={config.stats.users} onChange={(v) => setConfig((p) => ({ ...p, stats: { ...p.stats, users: v } }))} placeholder="500+" />
          <Field label="Número de ciudades" value={config.stats.cities} onChange={(v) => setConfig((p) => ({ ...p, stats: { ...p.stats, cities: v } }))} placeholder="5+" />
          <SaveButton onClick={() => save("stats")} saving={isSaving("stats")} />
        </SectionCard>

        {/* D — Sección vendedores */}
        <SectionCard title="D — Sección vendedores">
          <Field label="Título" value={config.sellers.title} onChange={(v) => setConfig((p) => ({ ...p, sellers: { ...p.sellers, title: v } }))} />
          <Field label="Subtítulo" value={config.sellers.subtitle} onChange={(v) => setConfig((p) => ({ ...p, sellers: { ...p.sellers, subtitle: v } }))} />
          <Field label="Texto del botón" value={config.sellers.button} onChange={(v) => setConfig((p) => ({ ...p, sellers: { ...p.sellers, button: v } }))} />
          <SaveButton onClick={() => save("sellers")} saving={isSaving("sellers")} />
        </SectionCard>

        {/* E — Sección compradores */}
        <SectionCard title="E — Sección compradores">
          <Field label="Título" value={config.buyers.title} onChange={(v) => setConfig((p) => ({ ...p, buyers: { ...p.buyers, title: v } }))} />
          <Field label="Subtítulo" value={config.buyers.subtitle} onChange={(v) => setConfig((p) => ({ ...p, buyers: { ...p.buyers, subtitle: v } }))} />
          <Field label="Texto del botón" value={config.buyers.button} onChange={(v) => setConfig((p) => ({ ...p, buyers: { ...p.buyers, button: v } }))} />
          <SaveButton onClick={() => save("buyers")} saving={isSaving("buyers")} />
        </SectionCard>

        {/* F — Banner global */}
        <SectionCard title="F — Banner global">
          <div className="flex items-center gap-3">
            <button
              role="switch"
              aria-checked={config.banner.active}
              onClick={() => setConfig((p) => ({ ...p, banner: { ...p.banner, active: !p.banner.active } }))}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.banner.active ? "bg-purple-600" : "bg-slate-300"}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${config.banner.active ? "translate-x-6" : "translate-x-1"}`} />
            </button>
            <span className="text-sm font-semibold text-slate-700">
              {config.banner.active ? "Banner activo" : "Banner inactivo"}
            </span>
          </div>
          <Field label="Mensaje del banner" value={config.banner.message} onChange={(v) => setConfig((p) => ({ ...p, banner: { ...p.banner, message: v } }))} placeholder="Texto que verán todos los visitantes" />
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Color</label>
            <div className="flex gap-2">
              {BANNER_COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setConfig((p) => ({ ...p, banner: { ...p.banner, color: c } }))}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${
                    config.banner.color === c ? "border-slate-900 scale-105" : "border-transparent"
                  } ${
                    c === "purple" ? "bg-purple-600 text-white" :
                    c === "amber" ? "bg-amber-400 text-amber-950" :
                    c === "red" ? "bg-red-600 text-white" :
                    "bg-green-600 text-white"
                  }`}
                >
                  {BANNER_COLOR_LABELS[c]}
                </button>
              ))}
            </div>
          </div>
          {config.banner.active && config.banner.message && (
            <div className={`rounded-xl px-4 py-2.5 text-sm font-semibold text-center ${
              config.banner.color === "purple" ? "bg-purple-600 text-white" :
              config.banner.color === "amber" ? "bg-amber-400 text-amber-950" :
              config.banner.color === "red" ? "bg-red-600 text-white" :
              "bg-green-600 text-white"
            }`}>
              Preview: {config.banner.message}
            </div>
          )}
          <SaveButton onClick={() => save("banner")} saving={isSaving("banner")} />
        </SectionCard>

      </main>
    </div>
  );
}
