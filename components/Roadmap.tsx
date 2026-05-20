export default function Roadmap() {
  return (
    <section id="roadmap" className="py-24 relative overflow-hidden border-t border-slate-200 bg-slate-100/40">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight">Evolución del Desarrollo</h2>
        </div>
        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-200 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg">v1.0.0-alpha</span>
            <h3 className="text-2xl font-bold text-slate-900">Infraestructura Core Alpha</h3>
          </div>
          <p className="text-slate-700 text-base mb-5">Arquitectura inicial establecida para la sincronización de datos multiplataforma.</p>
          <ul className="text-sm text-slate-600 space-y-2">
            <li>✓ Base de datos distribuida en la nube.</li>
            <li>✓ Interfaz nativa de alto rendimiento.</li>
            <li>✓ Landing page con micro-animaciones.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}