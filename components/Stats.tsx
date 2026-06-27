"use client";

import { useLandingConfig } from "@/lib/hooks/useLandingConfig";

export default function Stats() {
  const { config } = useLandingConfig();
  const { stores, users, cities } = config.stats;

  const items = [
    { value: stores, label: "Tiendas registradas", icon: "🏪" },
    { value: users, label: "Usuarios activos", icon: "👥" },
    { value: cities, label: "Ciudades", icon: "📍" },
  ];

  return (
    <section className="py-16 relative z-10 bg-gradient-to-r from-purple-600 to-cyan-500">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="grid grid-cols-3 gap-8 text-center text-white">
          {items.map((item) => (
            <div key={item.label}>
              <div className="text-3xl mb-1">{item.icon}</div>
              <p className="text-4xl font-extrabold tracking-tight">{item.value}</p>
              <p className="text-white/80 text-sm mt-1 font-medium">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
