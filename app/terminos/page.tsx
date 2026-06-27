import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos de Servicio | COMPRAPP",
  description:
    "Lee los Términos de Servicio de COMPRAPP desarrollado por JotaSystem. Marketplace local venezolano.",
};

export default function Terminos() {
  return (
    <div className="bg-white text-slate-800 min-h-screen font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-4xl">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-9 h-9 overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 to-cyan-400 p-[2px]">
              <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-white">
                <Image
                  src="/logo.png"
                  alt="Logo COMPRAPP"
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <span className="text-xl font-black tracking-wider text-slate-900 uppercase">
              COMPR
              <span className="bg-gradient-to-r from-purple-600 to-cyan-400 bg-clip-text text-transparent">
                APP
              </span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm font-semibold text-slate-500 hover:text-purple-600 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-6 py-14 max-w-4xl">
        {/* Título */}
        <div className="mb-10 border-b border-slate-100 pb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-600">
            Legal
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-2 mb-2">
            Términos de Servicio
          </h1>
          <p className="text-slate-400 text-sm">
            JotaSystem · Última actualización: junio 2026
          </p>
        </div>

        <div className="space-y-10 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              1. Descripción del servicio
            </h2>
            <p>
              COMPRAPP es una plataforma de <strong>marketplace local</strong> desarrollada por{" "}
              <strong>JotaSystem</strong> que conecta a compradores y vendedores dentro de una
              misma comunidad o zona geográfica, diseñada especialmente para el contexto
              económico venezolano.
            </p>
            <p className="mt-3">
              La plataforma permite publicar productos, gestionar inventario, consultar tasas
              de cambio BCV en tiempo real y coordinar transacciones en bolívares (Bs.) y
              dólares americanos (USD). <strong>COMPRAPP no procesa ni intermedia pagos directamente.</strong>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              2. Registro y cuentas de usuario
            </h2>
            <p>
              Para usar COMPRAPP debes tener <strong>18 años o más</strong>. Si eres menor
              de edad, necesitas la autorización expresa de tu representante legal, quien
              asumirá la responsabilidad por el uso de la plataforma.
            </p>
            <p className="mt-3">Al registrarte te comprometes a:</p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside text-slate-600">
              <li>Proporcionar información veraz, actual y completa.</li>
              <li>Mantener la confidencialidad de tus credenciales de acceso.</li>
              <li>Notificarnos de inmediato ante cualquier uso no autorizado de tu cuenta.</li>
              <li>No crear cuentas múltiples con propósitos fraudulentos.</li>
            </ul>
            <p className="mt-3">
              COMPRAPP no es responsable por daños derivados del uso no autorizado de tu
              cuenta si no tomaste las medidas de seguridad necesarias.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              3. Responsabilidades del vendedor
            </h2>
            <p>Como vendedor en COMPRAPP eres el único responsable de:</p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside text-slate-600">
              <li>La veracidad, exactitud y actualización de tus productos, precios e inventario.</li>
              <li>Cumplir con los pedidos que aceptes dentro del plazo acordado.</li>
              <li>Publicar precios honestos en Bs. o USD coherentes con el mercado.</li>
              <li>Atender las disputas o reclamos de compradores con buena fe.</li>
              <li>Contar con la verificación de identidad completada (cédula + selfie) para operar.</li>
              <li>Mantener información de contacto actualizada.</li>
            </ul>
            <p className="mt-3">
              COMPRAPP no valida ni garantiza la calidad de los productos publicados por
              vendedores terceros.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              4. Responsabilidades del comprador
            </h2>
            <p>Como comprador en COMPRAPP te comprometes a:</p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside text-slate-600">
              <li>Realizar el pago acordado con el vendedor una vez confirmado el pedido.</li>
              <li>No generar pedidos sin intención real de compra.</li>
              <li>Tratar a los vendedores con respeto y buena fe.</li>
              <li>Verificar el producto antes de confirmar su recepción cuando sea posible.</li>
              <li>Reportar cualquier irregularidad a través de los canales disponibles en la app.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              5. Sistema de pagos
            </h2>
            <p>
              <strong>COMPRAPP NO procesa ni intermedia pagos.</strong> Todos los métodos de
              pago disponibles (Pago Móvil, Zelle, criptomonedas u otros) son acordados y
              ejecutados directamente entre comprador y vendedor fuera de la plataforma.
            </p>
            <p className="mt-3">COMPRAPP no tiene acceso a:</p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside text-slate-600">
              <li>Cuentas bancarias o billeteras digitales de los usuarios.</li>
              <li>Fondos transferidos entre compradores y vendedores.</li>
              <li>Confirmaciones de pago de entidades bancarias o exchanges.</li>
            </ul>
            <p className="mt-3">
              En consecuencia, COMPRAPP no es responsable por disputas de pago, estafas,
              transferencias incorrectas o pérdidas económicas derivadas de las transacciones
              entre usuarios. Recomendamos verificar siempre la identidad del vendedor y usar
              métodos de pago con trazabilidad.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              6. Sistema de fiado (crédito informal)
            </h2>
            <p>
              COMPRAPP ofrece herramientas para que los vendedores registren créditos
              informales (<strong>fiado</strong>) con sus compradores habituales. Esta
              funcionalidad es un registro administrativo y <strong>NO constituye un servicio
              financiero ni un contrato de crédito regulado</strong>.
            </p>
            <p className="mt-3">COMPRAPP NO es responsable por:</p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside text-slate-600">
              <li>Deudas generadas entre vendedores y compradores a través del sistema de fiado.</li>
              <li>El cobro o recuperación de créditos otorgados.</li>
              <li>Disputas derivadas de acuerdos de crédito informal entre usuarios.</li>
            </ul>
            <p className="mt-3">
              El fiado es un acuerdo privado y de confianza entre las partes. COMPRAPP
              solo proporciona la herramienta de registro.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              7. Prohibiciones
            </h2>
            <p>Está estrictamente prohibido en COMPRAPP:</p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside text-slate-600">
              <li>Publicar o comercializar productos o servicios ilegales conforme a la legislación venezolana o internacional.</li>
              <li>Realizar fraudes, estafas o cualquier forma de engaño a otros usuarios.</li>
              <li>Publicar información falsa sobre productos, precios o identidad personal.</li>
              <li>Suplantar la identidad de otras personas o marcas.</li>
              <li>Utilizar la plataforma para blanqueo de capitales o actividades ilícitas.</li>
              <li>Publicar material que vulnere derechos de autor, marcas registradas o propiedad intelectual.</li>
              <li>Acosar, amenazar o incitar al odio contra otros usuarios.</li>
              <li>Usar bots, scripts automatizados o medios artificiales para manipular la plataforma.</li>
            </ul>
            <p className="mt-3">
              El incumplimiento puede derivar en suspensión inmediata y notificación a
              las autoridades competentes de la República Bolivariana de Venezuela.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              8. Suspensión y terminación de cuentas
            </h2>
            <p>
              COMPRAPP se reserva el derecho de suspender o eliminar cuentas, de forma
              temporal o permanente, ante:
            </p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside text-slate-600">
              <li>Violación de estos Términos de Servicio.</li>
              <li>Comportamiento fraudulento o abusivo hacia otros usuarios.</li>
              <li>Publicación de contenido ilegal o inapropiado.</li>
              <li>Suplantación de identidad.</li>
              <li>Solicitud expresa de autoridades competentes.</li>
            </ul>
            <p className="mt-3">
              Los usuarios también pueden eliminar su propia cuenta desde la sección
              de Configuración en cualquier momento.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              9. Limitación de responsabilidad
            </h2>
            <p>
              COMPRAPP proporciona su servicio{" "}
              <em>&quot;tal cual&quot;</em> y no garantiza la disponibilidad ininterrumpida
              de la plataforma. En la medida permitida por la ley, JotaSystem no será
              responsable por:
            </p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside text-slate-600">
              <li>Pérdidas económicas derivadas de transacciones entre usuarios.</li>
              <li>Daños directos, indirectos o consecuentes derivados del uso de la plataforma.</li>
              <li>Interrupciones del servicio por causas de fuerza mayor, fallos técnicos o de terceros.</li>
              <li>Inexactitud de las tasas de cambio mostradas (son orientativas, basadas en BCV).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              10. Jurisdicción
            </h2>
            <p>
              Estos Términos de Servicio se rigen por las leyes de la{" "}
              <strong>República Bolivariana de Venezuela</strong>. Cualquier controversia
              que no pueda resolverse de manera amistosa será sometida a la jurisdicción
              de los tribunales competentes de Venezuela.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              11. Modificaciones
            </h2>
            <p>
              JotaSystem se reserva el derecho de modificar estos Términos de Servicio
              en cualquier momento. Los cambios serán notificados dentro de la aplicación.
              El uso continuado de COMPRAPP tras una actualización implica la aceptación
              de los nuevos términos.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              12. Contacto
            </h2>
            <p>
              Para cualquier consulta relacionada con estos Términos de Servicio:
            </p>
            <div className="mt-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="font-semibold text-slate-800">JotaSystem</p>
              <a
                href="mailto:andersonjose@gmail.com"
                className="text-purple-600 hover:text-cyan-600 font-bold transition-colors"
              >
                andersonjose@gmail.com
              </a>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-100 py-8 mt-10">
        <div className="container mx-auto px-6 max-w-4xl flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 JotaSystem. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link
              href="/privacidad"
              className="hover:text-purple-600 transition-colors"
            >
              Política de Privacidad
            </Link>
            <span className="text-purple-600 font-semibold">
              Términos de Servicio
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
