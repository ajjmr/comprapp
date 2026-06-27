"use client";

import DownloadButton from "@/components/DownloadButton";
import { useLandingConfig } from "@/lib/hooks/useLandingConfig";

export default function BuyersSection() {
  const { config } = useLandingConfig();
  const { title, subtitle, button } = config.buyers;

  return (
    <section className="py-24 relative z-10 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 to-purple-50 rounded-3xl" />
            <div className="relative p-10 text-center">
              <div className="text-8xl mb-4">🛍️</div>
              <p className="text-3xl font-extrabold text-slate-900 mb-2">{config.stats.users}</p>
              <p className="text-slate-500 font-medium">usuarios activos</p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-left">
                {[
                  { icon: "📍", label: "Tiendas cercanas" },
                  { icon: "🚚", label: "Delivery a domicilio" },
                  { icon: "💸", label: "Bs. y USD" },
                  { icon: "⭐", label: "Reseñas reales" },
                ].map((f) => (
                  <div key={f.label} className="bg-white/80 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2 shadow-sm">
                    <span className="text-lg">{f.icon}</span>
                    <span className="text-xs font-semibold text-slate-700">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest bg-cyan-50 px-3 py-1 rounded-full border border-cyan-200">
              Para compradores
            </span>
            <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight mt-4 mb-4">
              {title}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {subtitle}
            </p>
            <ul className="space-y-3 text-slate-600 mb-10">
              {[
                "Explora tiendas de tu zona",
                "Precios en Bs. y USD actualizados",
                "Pide delivery o retira en tienda",
                "Historial de pedidos y favoritos",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <DownloadButton className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition-all">
              📱 {button} →
            </DownloadButton>
          </div>
        </div>
      </div>
    </section>
  );
}
