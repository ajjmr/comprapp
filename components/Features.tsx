export default function Features() {
  return (
    <section id="funciones" className="py-24 relative z-10 bg-white/60 border-t border-slate-200/60 shadow-inner">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">Arquitectura para el comercio inteligente</h2>
          <p className="text-base md:text-lg text-slate-600 mt-4 font-normal">Olvídate de las limitaciones geográficas. Un motor diseñado para aportar visibilidad operativa a comerciantes en cualquier lugar del mundo.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-md hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold mb-5 text-xl">🔄</div>
            <h3 className="text-lg font-bold mb-2 text-slate-900">Motor Multi-Moneda</h3>
            <p className="text-slate-600 text-xs leading-relaxed">Publica productos en una moneda base. Nuestra plataforma sincroniza tasas locales automáticamente.</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-md hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold mb-5 text-xl">💳</div>
            <h3 className="text-lg font-bold mb-2 text-slate-900">Pasarela Unificada</h3>
            <p className="text-slate-600 text-xs leading-relaxed">Procesa pagos sin fronteras. Soporte para billeteras digitales, transferencias y efectivo.</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-md hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold mb-5 text-xl">⭐</div>
            <h3 className="text-lg font-bold mb-2 text-slate-900">Fidelización Inteligente</h3>
            <p className="text-slate-600 text-xs leading-relaxed">Tarjetas de sellos digitales, cupones automatizados y recompensas basadas en reglas de negocio.</p>
          </div>
          <div className="p-6 rounded-3xl bg-white/80 backdrop-blur-md border border-slate-200 shadow-md hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold mb-5 text-xl">📡</div>
            <h3 className="text-lg font-bold mb-2 text-slate-900">Arquitectura Offline</h3>
            <p className="text-slate-600 text-xs leading-relaxed">Gestión robusta de caché local para mantener transacciones seguras sin internet.</p>
          </div>
        </div>
      </div>
    </section>
  );
}