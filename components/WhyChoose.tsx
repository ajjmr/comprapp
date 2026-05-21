export default function WhyChoose() {
  const items = [
    {
      e: "🌐",
      t: "Independencia Geográfica",
      d: "Publica tus productos en una moneda base y vende sin barreras desde cualquier lugar del mundo."
    },
    {
      e: "⚡",
      t: "Instalación Inmediata",
      d: "Descarga la APK directamente o añade la web a tu escritorio en segundos, sin intermediarios."
    },
    {
      e: "🔗",
      t: "Sincronización Omnicanal",
      d: "Tus datos se mantienen idénticos y en tiempo real tanto en la app del cliente como en tu panel web."
    },
    {
      e: "📡",
      t: "Operaciones Resilientes",
      d: "Continúa gestionando tu inventario de forma local aunque la conexión a internet falle."
    },
    {
      e: "🔒",
      t: "Seguridad Empresarial",
      d: "Respaldo en la nube con Firebase para mantener tus registros de ventas protegidos de extremo a extremo."
    },
    {
      e: "📈",
      t: "Escalabilidad Elástica",
      d: "Base de datos optimizada para responder rápido sin importar cuántos productos o tiendas cargues."
    }
  ];

  return (
    <section className="py-24 relative z-10 bg-white border-t border-slate-200 shadow-inner">
      <div className="container mx-auto px-6 max-w-5xl">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight">
            ¿Por qué implementar COMPRAPP?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
          {items.map((item, i) => (
            <div key={i} className="flex gap-4 items-start group hover:translate-y-[-2px] transition-all duration-200 ease-in-out">
              <div className="text-2xl p-3 bg-slate-50 border border-slate-100 rounded-xl transition-all duration-200 group-hover:bg-purple-50 group-hover:border-purple-200 group-hover:scale-110">
                {item.e}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">{item.t}</h4>
                <p className="text-slate-600 text-xs mt-1 leading-relaxed">{item.d}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}