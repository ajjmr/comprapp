export default function WhyChoose() {
  const items = [
    { e: "🌐", t: "Independencia Geográfica" },
    { e: "⚡", t: "Experiencia sin Fricciones" },
    { e: "🔗", t: "Sincronización Omnicanal" },
    { e: "📡", t: "Operaciones Resilientes" },
    { e: "🔒", t: "Security Empresarial" },
    { e: "📈", t: "Escalabilidad Elástica" }
  ];
  return (
    <section className="py-24 relative z-10 bg-white border-t border-slate-200 shadow-inner">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight">¿Por qué implementar COMPRAPP?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="text-2xl p-2 bg-slate-50 border border-slate-100 rounded-xl">{item.e}</div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">{item.t}</h4>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">Infraestructura modular que se adapta a cualquier tamaño de negocio.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}