"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface FormData {
  nombre: string;
  gmail: string;
  ciudad: string;
}

interface FormErrors {
  nombre?: string;
  gmail?: string;
  ciudad?: string;
}

const GMAIL_RE = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true as const, margin: "-60px" },
    transition: { 
      duration: 0.6, 
      delay, 
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] 
    },
  };
}

export default function BetaSection() {
  const [form, setForm] = useState<FormData>({ nombre: "", gmail: "", ciudad: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function validate(): boolean {
    const next: FormErrors = {};
    if (!form.nombre.trim()) next.nombre = "El nombre es requerido.";
    if (!form.gmail.trim()) {
      next.gmail = "El correo es requerido.";
    } else if (!GMAIL_RE.test(form.gmail.trim())) {
      next.gmail = "Ingresa un correo Gmail válido (@gmail.com).";
    }
    if (!form.ciudad.trim()) next.ciudad = "La ciudad es requerida.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");

    try {
      await addDoc(collection(db, "beta_testers"), {
        nombre: form.nombre.trim(),
        gmail: form.gmail.trim().toLowerCase(),
        ciudad: form.ciudad.trim(),
        timestamp: serverTimestamp(),
        status: "pendiente",
      });

      setStatus("success");
      setForm({ nombre: "", gmail: "", ciudad: "" });
    } catch {
      setStatus("error");
    }
  }

  function handleChange(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  function borderColor(field: keyof FormErrors, focused: boolean) {
    if (errors[field]) return "#ef4444";
    return focused ? "#6C3FC7" : "rgba(108,63,199,0.35)";
  }

  return (
    <section
      id="beta"
      className="relative py-28 overflow-hidden"
      style={{ background: "#0A0A1A" }}
    >
      {/* Glow central */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div
          className="w-[700px] h-[700px] rounded-full blur-[160px] opacity-20"
          style={{ background: "#6C3FC7" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-lg">
        {/* Encabezado */}
        <motion.div className="text-center mb-10" {...fadeUp(0)}>
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6 border"
            style={{
              color: "#A78BFA",
              borderColor: "rgba(108,63,199,0.4)",
              background: "rgba(108,63,199,0.12)",
            }}
          >
            Beta Cerrada
          </span>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            <span
              style={{
                background: "linear-gradient(90deg, #6C3FC7 0%, #4FACFE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Únete a la Beta
            </span>
          </h2>

          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mx-auto">
            Sé de los primeros en probar COMPRAPP antes del lanzamiento oficial
          </p>
        </motion.div>

        {/* Estado de Éxito: Checklist + VIP */}
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
            className="text-center py-10 px-8 rounded-3xl border relative overflow-hidden"
            style={{
              background: "rgba(108,63,199,0.1)",
              borderColor: "rgba(108,63,199,0.3)",
            }}
          >
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              transition={{ delay: 0.2, type: "spring" }}
              className="text-6xl mb-4 drop-shadow-lg"
            >
              🎉
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
              ¡Estás casi dentro!
            </h3>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Hemos guardado tu correo. Para recibir el enlace oficial de Google Play, <span className="font-bold text-white border-b border-purple-500">completa el paso 2</span>.
            </p>

            {/* Checklist Visual Interactivo */}
            <div className="bg-[#1A1A2E]/90 backdrop-blur-sm rounded-2xl p-6 mb-8 text-left border border-purple-500/30 shadow-inner">
              <h4 className="text-purple-400 font-bold mb-5 text-xs uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                Misión de Fundador:
              </h4>
              <ul className="space-y-5">
                <motion.li 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                  className="flex items-start gap-3 opacity-50"
                >
                  <span className="text-green-400 text-xl leading-none">✅</span>
                  <span className="text-slate-300 text-sm font-medium line-through decoration-green-400/50">1. Registrar correo Gmail.</span>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                  className="flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/10"
                >
                  <span className="text-amber-400 text-xl leading-none animate-bounce">⏳</span>
                  <span className="text-white text-sm font-semibold">2. Unirte al grupo VIP de WhatsApp (Recibirás la app allí).</span>
                </motion.li>
                <motion.li 
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-slate-600 text-xl leading-none">🔒</span>
                  <span className="text-slate-400 text-sm">3. Instalar la app por 14 días para asegurar tu puesto.</span>
                </motion.li>
              </ul>
            </div>

            {/* CTA Final WhatsApp */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="https://chat.whatsapp.com/TU_ENLACE_AQUI"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-extrabold text-white text-base transition-all group"
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #1DA851 100%)",
                boxShadow: "0 8px 30px rgba(37, 211, 102, 0.3)",
              }}
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current group-hover:animate-pulse" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              Completar el Paso 2
            </motion.a>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            {...fadeUp(0.1)}
            className="space-y-4"
            noValidate
          >
            {/* Nombre */}
            <motion.div {...fadeUp(0.15)}>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Nombre completo
              </label>
              <FocusInput
                type="text"
                placeholder="Ej: María García"
                value={form.nombre}
                onChange={handleChange("nombre")}
                hasError={!!errors.nombre}
                borderColorFn={(f) => borderColor("nombre", f)}
              />
              {errors.nombre && <p className="text-red-400 text-xs mt-1.5">{errors.nombre}</p>}
            </motion.div>

            {/* Gmail */}
            <motion.div {...fadeUp(0.2)}>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Correo Gmail
              </label>
              <FocusInput
                type="email"
                placeholder="tucorreo@gmail.com"
                value={form.gmail}
                onChange={handleChange("gmail")}
                hasError={!!errors.gmail}
                borderColorFn={(f) => borderColor("gmail", f)}
              />
              {errors.gmail && <p className="text-red-400 text-xs mt-1.5">{errors.gmail}</p>}
            </motion.div>

            {/* Ciudad */}
            <motion.div {...fadeUp(0.25)}>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase tracking-wider">
                Ciudad
              </label>
              <FocusInput
                type="text"
                placeholder="Ej: Caracas"
                value={form.ciudad}
                onChange={handleChange("ciudad")}
                hasError={!!errors.ciudad}
                borderColorFn={(f) => borderColor("ciudad", f)}
              />
              {errors.ciudad && <p className="text-red-400 text-xs mt-1.5">{errors.ciudad}</p>}
            </motion.div>

            {status === "error" && (
              <p className="text-red-400 text-sm text-center">
                Ocurrió un error. Intenta de nuevo o escríbenos a soporte@comprapp.net
              </p>
            )}

            {/* Botón */}
            <motion.div {...fadeUp(0.3)} className="pt-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 rounded-xl font-bold text-white text-base tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(90deg, #6C3FC7 0%, #4FACFE 100%)",
                  boxShadow: "0 4px 32px rgba(108,63,199,0.35)",
                }}
              >
                {status === "loading" ? "Procesando..." : "Quiero ser Verificador Beta"}
              </button>
            </motion.div>
          </motion.form>
        )}
      </div>
    </section>
  );
}

/* Input con manejo de focus para el borde dinámico */
function FocusInput({
  type,
  placeholder,
  value,
  onChange,
  hasError,
  borderColorFn,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError: boolean;
  borderColorFn: (focused: boolean) => string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      className="w-full px-4 py-3.5 rounded-xl text-white placeholder-slate-400 text-sm outline-none transition-all"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1.5px solid ${borderColorFn(focused)}`,
      }}
    />
  );
}