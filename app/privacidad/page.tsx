import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | COMPRAPP",
  description:
    "Conoce cómo COMPRAPP recopila, usa y protege tus datos personales. Desarrollado por JotaSystem.",
};

export default function Privacidad() {
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
            Política de Privacidad
          </h1>
          <p className="text-slate-400 text-sm">
            JotaSystem · Última actualización: junio 2026
          </p>
        </div>

        <div className="space-y-10 text-slate-700 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              1. Datos que recopilamos
            </h2>
            <p>
              Al registrarte y usar COMPRAPP recopilamos la siguiente información:
            </p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside text-slate-600">
              <li>
                <strong>Nombre completo</strong> — para identificarte dentro de la plataforma.
              </li>
              <li>
                <strong>Correo electrónico</strong> — para gestionar tu cuenta y enviarte
                notificaciones importantes.
              </li>
              <li>
                <strong>Número de teléfono</strong> — para verificación de identidad y
                contacto entre usuarios.
              </li>
              <li>
                <strong>Foto de perfil</strong> — opcional, para personalizar tu cuenta.
              </li>
              <li>
                <strong>Cédula de identidad y selfie</strong> — solo para vendedores,
                requerida para el proceso de verificación de identidad.
              </li>
              <li>
                <strong>Ubicación GPS</strong> — opcional, utilizada para facilitar
                entregas a domicilio (delivery) y mostrar tiendas cercanas.
              </li>
              <li>
                <strong>Historial de pedidos y transacciones</strong> registradas en
                la plataforma.
              </li>
              <li>
                <strong>Token FCM</strong> (Firebase Cloud Messaging) — para enviarte
                notificaciones push sobre pedidos, ofertas y novedades.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              2. Cómo usamos tus datos
            </h2>
            <p>Utilizamos tu información para los siguientes fines:</p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside text-slate-600">
              <li>Gestionar tu cuenta, perfil y preferencias dentro de la app.</li>
              <li>Facilitar la comunicación entre compradores y vendedores.</li>
              <li>Enviar notificaciones push relevantes sobre pedidos, ofertas y novedades.</li>
              <li>Verificar la identidad de los vendedores para mayor seguridad de la comunidad.</li>
              <li>Realizar análisis de uso anónimos para mejorar la plataforma y corregir errores.</li>
              <li>Mostrar contenido personalizado según tu historial y ubicación.</li>
              <li>Cumplir con obligaciones legales cuando sea requerido por las autoridades competentes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              3. Proveedores de infraestructura
            </h2>
            <p>
              COMPRAPP utiliza los siguientes servicios de terceros para operar.
              Cada proveedor tiene sus propias políticas de privacidad:
            </p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside text-slate-600">
              <li>
                <strong>Firebase (Google)</strong> — base de datos Firestore, autenticación
                de usuarios, almacenamiento de archivos y análisis de uso.
              </li>
              <li>
                <strong>Firebase Cloud Messaging (FCM)</strong> — servicio de notificaciones
                push para Android y Web.
              </li>
              <li>
                <strong>Firebase Storage</strong> — almacenamiento de imágenes de productos
                y perfiles.
              </li>
              <li>
                <strong>Cloudinary</strong> — almacenamiento de imágenes en versiones
                anteriores de la plataforma (legacy).
              </li>
            </ul>
            <p className="mt-3">
              Estos proveedores solo tienen acceso a los datos estrictamente necesarios
              para prestar sus servicios y están sujetos a acuerdos de confidencialidad
              y estándares internacionales de seguridad.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              4. No vendemos tus datos
            </h2>
            <p>
              COMPRAPP <strong>NO vende, alquila, intercambia ni comparte</strong> tus datos
              personales con terceros con fines comerciales o publicitarios. Tu información
              es estrictamente confidencial y se usa únicamente para los fines descritos
              en esta política.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              5. Retención de datos
            </h2>
            <p>
              Mantenemos tus datos mientras tu cuenta esté activa en COMPRAPP:
            </p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside text-slate-600">
              <li>
                Al eliminar tu cuenta, tus datos personales serán borrados en un
                plazo máximo de <strong>30 días</strong>.
              </li>
              <li>
                Los registros de pedidos y transacciones pueden retenerse por un
                período adicional por obligaciones legales o fiscales.
              </li>
              <li>
                Las imágenes de verificación (cédula/selfie) se eliminan una vez
                completada la verificación o al cerrar la cuenta, lo que ocurra primero.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              6. Tus derechos
            </h2>
            <p>Como usuario de COMPRAPP tienes derecho a:</p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside text-slate-600">
              <li>Acceder a los datos personales que tenemos sobre ti.</li>
              <li>Solicitar la corrección de datos incorrectos o desactualizados.</li>
              <li>
                <strong>Eliminar tu cuenta y todos tus datos personales</strong> desde la
                sección de Configuración o contactándonos directamente.
              </li>
              <li>Oponerte al uso de tus datos para comunicaciones de marketing.</li>
              <li>Solicitar la portabilidad de tus datos en formato legible.</li>
            </ul>
            <p className="mt-3">
              Para ejercer cualquiera de estos derechos, escríbenos a{" "}
              <a
                href="mailto:andersonjosemaita98@gmail.com"
                className="text-purple-600 hover:text-cyan-600 font-semibold transition-colors"
              >
                andersonjosemaita98@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              7. Menores de edad
            </h2>
            <p>
              COMPRAPP <strong>no está dirigido a menores de 18 años</strong>. No recopilamos
              conscientemente datos personales de menores sin la autorización expresa de su
              representante legal.
            </p>
            <p className="mt-3">
              Si eres menor de 18 años, debes contar con la autorización y supervisión de
              un adulto responsable para usar la plataforma. El representante legal asumirá
              la responsabilidad por el uso.
            </p>
            <p className="mt-3">
              Si identificamos que se han recopilado datos de un menor sin autorización
              procederemos a eliminarlos de inmediato. Contáctanos si tienes conocimiento
              de un caso así.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              8. Seguridad de los datos
            </h2>
            <p>
              Tomamos la seguridad de tu información muy en serio. Las medidas que
              implementamos incluyen:
            </p>
            <ul className="mt-2 space-y-1.5 list-disc list-inside text-slate-600">
              <li>
                Cifrado en tránsito mediante <strong>TLS</strong> para toda comunicación
                entre la app y nuestros servidores.
              </li>
              <li>
                Datos almacenados en <strong>Firebase</strong>, que cumple con los
                estándares ISO 27001, SOC 1, SOC 2 y SOC 3.
              </li>
              <li>
                Reglas de seguridad de Firestore que garantizan que solo tú puedas
                acceder a tus datos personales.
              </li>
              <li>
                Acceso restringido a los datos por parte del equipo de JotaSystem
                bajo principio de mínimo privilegio.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              9. Cambios a esta política
            </h2>
            <p>
              Podemos actualizar esta Política de Privacidad ocasionalmente. Te
              notificaremos dentro de la aplicación cuando ocurran cambios importantes.
              El uso continuado de COMPRAPP tras una actualización implica la aceptación
              de la nueva política.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-purple-700 mb-3">
              10. Contacto
            </h2>
            <p>
              Para ejercer tus derechos, hacer consultas sobre privacidad o reportar
              problemas relacionados con tus datos:
            </p>
            <div className="mt-3 p-4 bg-purple-50 rounded-xl border border-purple-100">
              <p className="font-semibold text-slate-800">JotaSystem</p>
              <a
                href="mailto:andersonjosemaita98@gmail.com"
                className="text-purple-600 hover:text-cyan-600 font-bold transition-colors"
              >
                andersonjosemaita98@gmail.com
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
            <span className="text-purple-600 font-semibold">
              Política de Privacidad
            </span>
            <Link
              href="/terminos"
              className="hover:text-purple-600 transition-colors"
            >
              Términos de Servicio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
