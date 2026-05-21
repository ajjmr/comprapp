export default function Roadmap() {
  const versions = [
    {
      version: "v1.0.0-alpha",
      title: "Infraestructura Core",
      description: "Arquitectura inicial establecida para la sincronización de datos multiplataforma.",
      items: [
        "Base de datos distribuida en la nube con Firebase.",
        "Autenticación de usuarios y gestión de sesiones.",
        "Interfaz nativa Android de alto rendimiento.",
      ],
      status: "done",
    },
    {
      version: "v1.2.0",
      title: "Comercio Local Completo",
      description: "Funcionalidades clave para el ecosistema de compra y venta local.",
      items: [
        "Tasa BCV en tiempo real con historial y calculadora.",
        "Sistema de pedidos, carrito y confirmación animada.",
        "Dashboard web para vendedores — inventario, pedidos y fiado.",
        "Modo sin internet con caché local de catálogos.",
        "Tutorial interactivo para nuevos usuarios.",
      ],
      status: "current",
    },
    {
      version: "v2.0.0",
      title: "Expansión y Escala",
      description: "Funcionalidades avanzadas para escalar el ecosistema.",
      items: [
        "Notificaciones push en tiempo real.",
        "Pagos con Zelle y criptomonedas.",
        "Alertas de precio y stock bajo.",
        "Catálogo compartible en redes sociales.",
        "Panel de analítica avanzada para vendedores.",
      ],
      status: "upcoming",
    },
  ];

  return (
    <section id="roadmap" className="py-24 relative overflow-hidden border-t border-slate-200 bg-slate-100/40">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">

        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-950 tracking-tight">
            Evolución del Desarrollo
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
              <div className="flex items-center gap-4 mb-4">
                <span
                  className={`text-white text-xs font-bold px-3 py-1.5 rounded-lg ${
                    v.status === "done"
                      ? "bg-slate-700"
                      : v.status === "current"
                      ? "bg-gradient-to-r from-purple-600 to-cyan-500"
                      : "bg-slate-300 text-slate-600"
                  }`}
                >
                  {v.version}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{v.title}</h3>
                {v.status === "current" && (
                  <span className="ml-auto text-[10px] font-bold text-purple-600 bg-purple-50 border border-purple-200 px-2 py-1 rounded-full">
                    ● En producción
                  </span>
                )}
                {v.status === "upcoming" && (
                  <span className="ml-auto text-[10px] font-bold text-slate-400 bg-slate-100 border border-slate-200 px-2 py-1 rounded-full">
                    Próximamente
                  </span>
                )}
              </div>
              <p className="text-slate-600 text-sm mb-4">{v.description}</p>
              <ul className="text-sm text-slate-600 space-y-2">
                {v.items.map((item, j) => (
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