export default function HowItWorks() {
  const steps = [
    { number: "1", emoji: "📱", title: "Descarga la app", description: "Instala COMPRAPP en tu Android o accede desde el Dashboard Web en segundos." },
    { number: "2", emoji: "🏪", title: "Registra tu tienda", description: "Crea tu perfil de vendedor, sube tu catálogo y configura tus métodos de pago." },
    { number: "3", emoji: "💰", title: "Empieza a vender", description: "Recibe pedidos, gestiona tu inventario y cobra en Bs o USD a tasa BCV." },
  ];

  return (
    <section className="py-24 relative z-10 bg-white/60 border-t border-slate-200/60">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight">
            ¿Cómo funciona?
          </h2>
          <p className="text-base md:text-lg text-slate-600 mt-4 font-normal">
            En 3 pasos estás vendiendo
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Línea conectora (solo desktop) */}
          <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-purple-200 via-cyan-200 to-purple-200" />

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative">
              {/* Número grande en gradiente */}
              <div className="relative mb-4">
                <span className="text-7xl font-black bg-gradient-to-b from-purple-600 to-cyan-500 bg-clip-text text-transparent leading-none select-none">
                  {step.number}
                </span>
                <span className="absolute -bottom-1 -right-3 text-3xl">{step.emoji}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 mt-2">{step.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-[220px]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
