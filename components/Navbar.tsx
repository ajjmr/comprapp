import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-white/70 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm shadow-slate-100/50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO COMPRAPP */}
        <Link href="#comenzar" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative w-9 h-9 overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-gradient-to-br from-purple-600 to-cyan-500 p-[1px]">
            <div className="relative w-full h-full rounded-[11px] overflow-hidden bg-white">
              <Image src="/logo.png" alt="Logo Comprapp" fill sizes="40px" className="object-cover" priority />
            </div>
          </div>
          <span className="text-xl font-black tracking-wider text-slate-900 uppercase">
            COMPR<span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">APP</span>
          </span>
        </Link>

        {/* ENLACES DE NAVEGACIÓN */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#funciones" className="text-sm font-bold text-slate-600 hover:text-cyan-600 transition-colors">Funciones</Link>
          <Link href="#casos" className="text-sm font-bold text-slate-600 hover:text-cyan-600 transition-colors">Ecosistema</Link>
          <Link href="#roadmap" className="text-sm font-bold text-slate-600 hover:text-cyan-600 transition-colors">Roadmap</Link>
          
          {/* BOTÓN DE DESCARGA DIRECTA */}
          <a 
            href="/downloads/comprapp.apk" 
            download 
            className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all shadow-lg border border-white/10 hover:scale-105 transform duration-200"
          >
            Descargar
          </a>
        </div>

      </div>
    </nav>
  );
}