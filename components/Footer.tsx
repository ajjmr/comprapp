import DownloadButton from "@/components/DownloadButton";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 relative z-10">

      {/* CTA final antes del footer */}
      <div className="bg-gradient-to-r from-purple-600 to-cyan-500 py-16 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          ¿Listo para digitalizar tu negocio?
        </h2>
        <p className="text-white/80 text-base mb-8 max-w-xl mx-auto">
          Descarga COMPRAPP gratis y empieza a vender hoy mismo.
        </p>
        <DownloadButton className="bg-white text-purple-700 font-bold px-10 py-4 rounded-xl shadow-xl hover:bg-slate-100 transition-all inline-flex items-center gap-3">
          <span className="text-xl">📱💻</span>
          Descargar - ANDROID &amp; PC
        </DownloadButton>
      </div>

      {/* Footer content */}
      <div className="container mx-auto px-6 py-12 max-w-5xl">
        <div className="grid md:grid-cols-3 gap-10 mb-10">

          {/* Marca */}
          <div>
            <p className="font-extrabold text-slate-900 text-lg tracking-tight mb-2">COMPRAPP</p>
            <p className="text-slate-500 text-sm leading-relaxed">
              La plataforma que conecta tiendas locales con sus clientes, donde sea.
            </p>
            <p className="text-xs text-slate-400 mt-3">
              Powered by{" "}
              <span className="text-purple-600 font-bold">JOTASYSTEM</span>
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="font-bold text-slate-800 text-sm mb-4 uppercase tracking-wider">
              Plataforma
            </p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a href="#funciones" className="hover:text-purple-600 transition-colors">
                  Funciones
                </a>
              </li>
              <li>
                <a href="#casos" className="hover:text-purple-600 transition-colors">
                  Casos de uso
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-purple-600 transition-colors">
                  Roadmap
                </a>
              </li>
              <li>
                <DownloadButton className="hover:text-purple-600 transition-colors">
                  Descargar
                </DownloadButton>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="font-bold text-slate-800 text-sm mb-4 uppercase tracking-wider">
              Contacto
            </p>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <a
                  href="mailto:soporte@comprapp.net"
                  className="hover:text-purple-600 transition-colors"
                >
                  soporte@comprapp.net
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/comprapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600 transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@comprapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-600 transition-colors"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Comprapp Inc. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="/privacidad" className="hover:text-purple-600 transition-colors">
              Política de privacidad
            </a>
            <a href="/terminos" className="hover:text-purple-600 transition-colors">
              Términos de uso
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
