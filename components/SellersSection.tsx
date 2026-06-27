"use client";

import Link from "next/link";
import { useLandingConfig } from "@/lib/hooks/useLandingConfig";

export default function SellersSection() {
  const { config } = useLandingConfig();
  const { title, subtitle, button } = config.sellers;

  return (
    <section className="py-24 relative z-10 bg-white border-t border-slate-100">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Para vendedores
            </span>
            <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight mt-4 mb-4">
              {title}
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              {subtitle}
            </p>
            <ul className="space-y-3 text-slate-600 mb-10">
              {[
                "Crea tu tienda en minutos, sin costo",
                "Controla tu inventario en tiempo real",
                "Recibe pedidos y gestiona entregas",
                "Tasa BCV actualizada automáticamente",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="https://app.comprapp.net/register"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:opacity-90 transition-all"
            >
              🏪 {button} →
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-cyan-50 rounded-3xl" />
            <div className="relative p-10 text-center">
              <div className="text-8xl mb-4">🏪</div>
              <p className="text-3xl font-extrabold text-slate-900 mb-2">{config.stats.stores}</p>
              <p className="text-slate-500 font-medium">tiendas registradas</p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-left">
                {[
                  { icon: "📦", label: "Inventario digital" },
                  { icon: "💬", label: "Chat con clientes" },
                  { icon: "📊", label: "Panel de ventas" },
                  { icon: "🎟️", label: "Cupones y fidelidad" },
                ].map((f) => (
                  <div key={f.label} className="bg-white/80 backdrop-blur-sm rounded-xl p-3 flex items-center gap-2 shadow-sm">
                    <span className="text-lg">{f.icon}</span>
                    <span className="text-xs font-semibold text-slate-700">{f.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
