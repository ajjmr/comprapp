"use client";

import { useLandingConfig } from "@/lib/hooks/useLandingConfig";

export default function Roadmap() {
  const { config } = useLandingConfig();
  const { versions } = config;

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden border-t border-slate-200 bg-slate-100/40">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight">
            Versiones y Novedades
          </h2>
          <p className="text-slate-500 mt-3 text-base">El camino recorrido y lo que viene.</p>
        </div>

        <div className="space-y-6">
          {versions.map((v, i) => (
            <div
              key={i}
              className={`bg-white/90 backdrop-blur-xl p-8 rounded-3xl border shadow-xl transition-all ${
                v.status === "current"
                  ? "border-purple-300 shadow-purple-100"
                  : "border-slate-200"
              }`}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span
                  className={`shrink-0 text-white text-xs font-bold px-3 py-1.5 rounded-lg ${
                    v.status === "done"
                      ? "bg-slate-700"
                      : v.status === "current"
                      ? "bg-gradient-to-r from-purple-600 to-cyan-500"
                      : "bg-slate-300 text-slate-600"
                  }`}
                >
                  {v.number}
                </span>
                <h3 className="text-xl font-bold text-slate-900 min-w-0 flex-1">{v.title}</h3>
                {v.date && (
                  <span className="text-xs text-slate-400 font-medium">{v.date}</span>
                )}
                {v.status === "current" && (
                  <span className="text-[10px] font-bold text-purple-600 bg-purple-50 border border-purple-200 px-2 py-1 rounded-full">
                    ● En producción
                  </span>
                )}
                {v.status === "upcoming" && (
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-1 rounded-full">
                    Próximamente
                  </span>
                )}
              </div>
              <ul className="text-sm text-slate-600 space-y-2">
                {v.features.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className={v.status === "upcoming" ? "text-slate-300" : "text-purple-500"}>
                      {v.status === "upcoming" ? "○" : "✓"}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
