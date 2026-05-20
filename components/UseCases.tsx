export default function UseCases() {
  return (
    <section id="casos" className="py-24 relative z-10 bg-slate-100/60 border-t border-slate-200">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest bg-cyan-100 px-3 py-1 rounded-full border border-cyan-200">Ecosistema Global</span>
          <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight mt-3">Una arquitectura, múltiples aplicaciones</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { t: "Boutiques Inteligentes", d: "Vendedores distribuyen catálogos digitales con un toque. Clientes internacionales reservan artículos en preventa." },
            { t: "Suministros Críticos", d: "Alertas de umbral de stock para inventarios de alta rotación. Reposición y logística automatizada." },
            { t: "Consumidor Recurrente", d: "Clientes guardan perfiles de compra semanal. Cargar listas complejas toma un solo segundo." }
          ].map((c, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3">{c.t}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}