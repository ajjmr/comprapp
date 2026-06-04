"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import emailjs from "@emailjs/browser";

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
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
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

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          nombre: form.nombre.trim(),
          gmail: form.gmail.trim().toLowerCase(),
          ciudad: form.ciudad.trim(),
          fecha: new Date().toLocaleString("es-VE", { timeZone: "America/Caracas" }),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

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

        {/* Estado de éxito */}
        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12 px-8 rounded-3xl border"
            style={{
              background: "rgba(108,63,199,0.1)",
              borderColor: "rgba(108,63,199,0.3)",
            }}
          >
            <div className="text-5xl mb-4">💜</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              ¡Listo! Te contactaremos pronto
            </h3>
            <p className="text-slate-400 text-sm">
              Estás en la lista. Pronto recibirás noticias sobre la beta.
            </p>
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
            <motion.div {...fadeUp(0.3)} className="pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 rounded-xl font-bold text-white text-base tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98]"
                style={{
                  background: "linear-gradient(90deg, #6C3FC7 0%, #4FACFE 100%)",
                  boxShadow: "0 4px 32px rgba(108,63,199,0.35)",
                }}
              >
                {status === "loading" ? "Enviando..." : "Quiero ser Verificador Beta"}
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
      className="w-full px-4 py-3.5 rounded-xl text-white placeholder-slate-500 text-sm outline-none transition-all"
      style={{
        background: "#1A1A2E",
        border: `1.5px solid ${borderColorFn(focused)}`,
      }}
    />
  );
}
