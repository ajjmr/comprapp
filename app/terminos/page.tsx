import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Comprapp",
  description:
    "Lee los términos y condiciones de uso de la plataforma Comprapp.",
};

export default function Terminos() {
  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm shadow-slate-100/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-gradient-to-br from-purple-600 to-cyan-500 p-[1px]">
              <div className="relative w-full h-full rounded-[11px] overflow-hidden bg-white">
                <Image
                  src="/logo.png"
                  alt="Logo Comprapp"
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <span className="text-xl font-black tracking-wider text-slate-900 uppercase">
              COMPR
              <span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">
                APP
              </span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-bold text-slate-600 hover:text-cyan-600 transition-colors flex items-center gap-1.5"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-6 py-16 max-w-3xl">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600">
            Legal
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2 mb-3">
            Términos y Condiciones
          </h1>
          <p className="text-slate-500 text-sm">
            Última actualización: mayo 2026
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
              1. Descripción del servicio
            </h2>
            <p>
              Comprapp es una plataforma de <strong>marketplace local</strong> que conecta a
              compradores y vendedores dentro de una misma comunidad o zona geográfica. A través de
              la aplicación, los usuarios pueden publicar productos, gestionar inventario, sincronizar
              divisas en tiempo real y realizar o recibir pagos de forma digital.
            </p>
            <p className="mt-3">
              El servicio está disponible para dispositivos Android, iOS y PC, y está diseñado
              especialmente para economías dinámicas donde la agilidad y la confianza son clave.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
              2. Responsabilidad del vendedor
            </h2>
            <p>
              Cada vendedor es el <strong>único responsable</strong> de los productos que publica en
              la plataforma, incluyendo:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-slate-600">
              <li>La veracidad y exactitud de la descripción, precio e imágenes del producto.</li>
              <li>La disponibilidad real del producto al momento de recibir un pedido.</li>
              <li>El cumplimiento de la entrega o acuerdo pactado con el comprador.</li>
              <li>La calidad y estado del producto al momento de la venta.</li>
            </ul>
            <p className="mt-3">
              Comprapp no valida ni garantiza la calidad de los productos publicados por vendedores
              terceros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
              3. Comprapp no es parte de las transacciones
            </h2>
            <p>
              Comprapp actúa exclusivamente como <strong>intermediario tecnológico</strong> entre
              compradores y vendedores. No somos parte de ninguna transacción comercial que se realice
              a través de la plataforma.
            </p>
            <p className="mt-3">
              En consecuencia, Comprapp no asume responsabilidad por disputas, incumplimientos,
              fraudes, daños o pérdidas derivadas de las transacciones entre usuarios. Cualquier
              conflicto entre comprador y vendedor debe resolverse directamente entre las partes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
              4. Productos prohibidos
            </h2>
            <p>
              Está estrictamente prohibido publicar, ofrecer o negociar a través de Comprapp cualquier
              producto o servicio que sea:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-slate-600">
              <li>Ilegal conforme a la legislación venezolana o internacional aplicable.</li>
              <li>Sustancias controladas, armas o artículos de uso militar sin autorización.</li>
              <li>Material que vulnere derechos de autor, marcas registradas u otros derechos de propiedad intelectual.</li>
              <li>Artículos falsificados o que induzcan a engaño sobre su origen o autenticidad.</li>
            </ul>
            <p className="mt-3">
              El incumplimiento de esta cláusula puede derivar en la suspensión inmediata de la cuenta
              y en la notificación a las autoridades competentes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
              5. Suspensión de cuentas
            </h2>
            <p>
              Comprapp se reserva el derecho de <strong>suspender o eliminar</strong> cualquier cuenta
              de usuario, de forma temporal o permanente, en los siguientes casos:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-slate-600">
              <li>Incumplimiento de estos Términos y Condiciones.</li>
              <li>Publicación de contenido fraudulento, engañoso o inapropiado.</li>
              <li>Comportamiento abusivo hacia otros usuarios de la plataforma.</li>
              <li>Uso de la plataforma para actividades ilegales o no autorizadas.</li>
              <li>Suplantación de identidad u otro tipo de fraude.</li>
            </ul>
            <p className="mt-3">
              En casos graves, la suspensión será inmediata y sin previo aviso.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
              6. Ley aplicable
            </h2>
            <p>
              Estos Términos y Condiciones se rigen por las leyes de la{" "}
              <strong>República Bolivariana de Venezuela</strong>. Cualquier controversia derivada del
              uso de la plataforma que no pueda resolverse de forma amistosa será sometida a la
              jurisdicción de los tribunales competentes de Venezuela.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
              7. Modificaciones
            </h2>
            <p>
              Comprapp se reserva el derecho de modificar estos Términos y Condiciones en cualquier
              momento. Los cambios serán notificados dentro de la aplicación o por correo electrónico.
              El uso continuado de la plataforma tras una actualización implica la aceptación de los
              nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
              8. Contacto
            </h2>
            <p>
              Para cualquier consulta relacionada con estos términos, puedes contactarnos en:
            </p>
            <p className="mt-3">
              <a
                href="mailto:soporte@comprapp.net"
                className="inline-flex items-center gap-2 text-purple-600 hover:text-cyan-600 font-bold transition-colors text-base"
              >
                soporte@comprapp.net
              </a>
            </p>
          </section>

        </div>
      </main>

      {/* Footer simple */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="container mx-auto px-6 max-w-3xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Comprapp Inc. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link href="/privacidad" className="hover:text-purple-600 transition-colors">
              Política de privacidad
            </Link>
            <Link href="/terminos" className="text-purple-600 font-semibold">
              Términos de uso
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
