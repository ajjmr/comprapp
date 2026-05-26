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
                  href="https://www.instagram.com/somoscomprapp?igsh=aWhzcWkyYjZ5NWRs&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-pink-500 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="ig-footer-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f09433" />
                        <stop offset="25%" stopColor="#e6683c" />
                        <stop offset="50%" stopColor="#dc2743" />
                        <stop offset="75%" stopColor="#cc2366" />
                        <stop offset="100%" stopColor="#bc1888" />
                      </linearGradient>
                    </defs>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-footer-grad)" strokeWidth="2" />
                    <circle cx="12" cy="12" r="4" stroke="url(#ig-footer-grad)" strokeWidth="2" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-footer-grad)" />
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/share/18n9EkSRFr/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 flex-shrink-0" fill="#1877F2" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
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
