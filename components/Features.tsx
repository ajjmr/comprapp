"use client";

import { useLandingConfig } from "@/lib/hooks/useLandingConfig";

export default function Features() {
  const { config } = useLandingConfig();
  const { features } = config;

  return (
    <section id="funciones" className="py-24 relative z-10 bg-white/60 border-t border-slate-200/60 shadow-inner">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
            Arquitectura para el comercio inteligente
          </h2>
          <p className="text-base md:text-lg text-slate-600 mt-4 font-normal">
            Un motor diseñado para dar visibilidad operativa a comerciantes locales desde cualquier dispositivo.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold mb-5 text-xl">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">{f.title}</h3>
              <p className="text-slate-600 text-xs leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
