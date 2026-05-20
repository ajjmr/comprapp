export default function Footer() {
  return (
    <footer className="bg-white text-slate-500 py-12 text-center border-t border-slate-200 text-sm relative z-10 shadow-inner">
      <p className="text-slate-600 font-bold uppercase tracking-[2px] text-xs">Pensando en Grande. Gestionando lo Local.</p>
      <p className="mt-4 text-slate-500 font-medium italic">
        © {new Date().getFullYear()} Comprapp Inc. Todos los derechos reservados.
      </p>
      <p className="mt-2 text-xs text-slate-400">Powered by <span className="text-purple-600 font-bold">JOTASYSTEM</span></p>
    </footer>
  );
}