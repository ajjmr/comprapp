import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Comprapp",
  description:
    "Conoce cómo Comprapp recopila, usa y protege tus datos personales.",
};

export default function Privacidad() {
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
            Política de Privacidad
          </h1>
          <p className="text-slate-500 text-sm">
            Última actualización: mayo 2026
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-10 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
              1. Datos que recopilamos
            </h2>
            <p>
              Al registrarte y usar Comprapp recopilamos la siguiente información:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-slate-600">
              <li>
                <strong>Nombre completo</strong> — para identificarte dentro de la plataforma.
              </li>
              <li>
                <strong>Correo electrónico</strong> — para gestionar tu cuenta y enviarte notificaciones.
              </li>
              <li>
                <strong>Número de teléfono</strong> — para verificación y contacto con compradores o vendedores.
              </li>
              <li>
                <strong>Ubicación</strong> — para mostrarte productos y tiendas cercanas a tu zona.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
              2. Cómo usamos tus datos
            </h2>
            <p>
              Utilizamos la información recopilada para los siguientes fines:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-slate-600">
              <li>Mejorar la experiencia dentro de la aplicación y desarrollar nuevas funcionalidades.</li>
              <li>Enviarte notificaciones relevantes sobre tu cuenta, pedidos y ofertas cercanas.</li>
              <li>Realizar análisis de uso (analytics) para entender cómo se utiliza la plataforma y corregir errores.</li>
              <li>Personalizar el contenido que ves según tu ubicación e historial dentro de la app.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
              3. Almacenamiento de datos
            </h2>
            <p>
              Toda la información de los usuarios es almacenada de forma segura en{" "}
              <strong>Firebase</strong>, la plataforma de servicios en la nube de Google. Firebase
              cumple con los estándares internacionales de seguridad y protección de datos, incluidos
              SOC 1, SOC 2, SOC 3, ISO 27001 e ISO 27017.
            </p>
            <p className="mt-3">
              Los datos están protegidos mediante cifrado en tránsito (TLS) y en reposo, y el acceso
              está restringido únicamente al personal autorizado de Comprapp.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
              4. No vendemos tus datos
            </h2>
            <p>
              Comprapp <strong>no vende, alquila ni comparte</strong> tus datos personales con terceros
              con fines comerciales. Tu información es estrictamente confidencial y solo se utiliza
              para los fines descritos en esta política.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
              5. Tus derechos
            </h2>
            <p>
              Como usuario tienes derecho a:
            </p>
            <ul className="mt-3 space-y-2 list-disc list-inside text-slate-600">
              <li>Acceder a los datos personales que tenemos sobre ti.</li>
              <li>Solicitar la corrección de datos incorrectos o desactualizados.</li>
              <li>
                <strong>Eliminar tu cuenta y todos tus datos</strong> en cualquier momento, desde la
                configuración de la app o contactándonos directamente.
              </li>
              <li>Oponerte al tratamiento de tus datos para fines de marketing.</li>
            </ul>
            <p className="mt-3">
              Para ejercer cualquiera de estos derechos, escríbenos a{" "}
              <a
                href="mailto:soporte@comprapp.net"
                className="text-purple-600 hover:text-cyan-600 font-semibold transition-colors"
              >
                soporte@comprapp.net
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 pb-2 border-b border-slate-100">
              6. Contacto
            </h2>
            <p>
              Si tienes dudas, consultas o solicitudes relacionadas con tu privacidad, puedes
              contactarnos en:
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
            <Link href="/privacidad" className="text-purple-600 font-semibold">
              Política de privacidad
            </Link>
            <Link href="/terminos" className="hover:text-purple-600 transition-colors">
              Términos de uso
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
