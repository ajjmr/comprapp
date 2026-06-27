"use client";

import { useLandingConfig } from "@/lib/hooks/useLandingConfig";

export default function WhyChoose() {
  const { config } = useLandingConfig();
  const { title, reasons } = config.whyChoose;

  return (
    <section className="py-24 relative z-10 bg-white border-t border-slate-200 shadow-inner">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight">{title}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
          {reasons.map((item, i) => (
            <div
              key={i}
              className="flex gap-4 items-start group hover:translate-y-[-2px] transition-all duration-200 ease-in-out"
            >
              <div className="text-2xl p-3 bg-slate-50 border border-slate-100 rounded-xl transition-all duration-200 group-hover:bg-purple-50 group-hover:border-purple-200 group-hover:scale-110">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
