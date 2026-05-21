"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setIsInstallable(false);
  };

  return (
    <header id="comenzar" className="container mx-auto px-6 py-20 md:py-32 flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10">

      {/* BLOQUE IZQUIERDO con animaciones en cascada */}
      <div className="flex-1 space-y-6 text-center lg:text-left">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative w-20 h-20">
            <Image src="/logo.png" alt="Comprapp Logo" fill className="object-contain" />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="bg-gradient-to-r from-purple-50 to-cyan-50 text-purple-700 text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full inline-block border border-purple-200/60 shadow-sm backdrop-blur-sm"
        >
          ⚡ Disponible para Android y PC
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-950 leading-[1.05]"
        >
          Tu mercado local, <br />
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
            en tu bolsillo
          </span>
        </motion.h1>

        {/* Párrafo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed font-normal"
        >
          Compra y vende en tu zona con precios en{" "}
          <span className="text-slate-900 font-semibold">Bs y USD a tasa BCV</span>.
          Gestiona tu tienda desde Android o tu PC, con o sin internet.
        </motion.p>

        {/* Botones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          className="flex flex-wrap gap-4 justify-center lg:justify-start pt-6"
        >
          <a
            href="/downloads/comprapp.apk"
            download
            className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:opacity-90 transition-all text-center flex items-center gap-3"
          >
            <span className="text-2xl">📱</span>
            <div className="text-left">
              <p className="text-[10px] font-normal opacity-80">Descarga gratis</p>
              <p className="text-sm font-bold">Android APK</p>
            </div>
          </a>

          {isInstallable ? (
            <button
              onClick={handleInstallClick}
              className="bg-slate-950 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:bg-slate-800 transition-all text-center flex items-center gap-3"
            >
              <span className="text-2xl">💻</span>
              <div className="text-left">
                <p className="text-[10px] font-normal opacity-60">Instalar en</p>
                <p className="text-sm font-bold">PC / Escritorio</p>
              </div>
            </button>
          ) : (
            <Link
              href="#funciones"
              className="bg-white/60 backdrop-blur-sm hover:bg-slate-100/80 text-slate-700 border border-slate-200 font-semibold px-10 py-4 rounded-xl shadow-sm transition-all text-center"
            >
              Ver funciones →
            </Link>
          )}
        </motion.div>

        {/* Nota versión */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="text-xs text-slate-400 pt-2"
        >
          Versión actual: <span className="font-semibold text-slate-500">v1.2.0</span> · Android 8.0+ requerido
        </motion.p>

      </div>

      {/* ESCENA MULTIPLATAFORMA */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="flex-1 flex justify-center w-full max-w-xl lg:max-w-none relative mt-16 lg:mt-0 group/scene"
      >
        <div className="absolute top-12 left-12 w-72 h-72 bg-purple-300 rounded-full blur-[90px] opacity-30 transition-all duration-700 group-hover/scene:opacity-40 group-hover/scene:scale-110"></div>
        <div className="absolute bottom-12 right-12 w-72 h-72 bg-cyan-300 rounded-full blur-[90px] opacity-30 transition-all duration-700 group-hover/scene:opacity-40 group-hover/scene:scale-110"></div>

        <div className="relative w-full min-h-[450px] flex items-center justify-between p-2 gap-4">

          {/* 📱 ANDROID APP */}
          <div className="w-[28%] aspect-[9/19] bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-xl border-[3px] border-slate-950 overflow-hidden flex flex-col items-center justify-center p-4 text-center ring-1 ring-black/10 self-end mb-6 cursor-pointer z-20
            transition-all duration-500 ease-out transform -rotate-2
            group-hover/scene:-translate-x-10 group-hover/scene:opacity-40 group-hover/scene:scale-95
            hover:!translate-x-0 hover:!opacity-100 hover:!scale-105 hover:!z-50 hover:border-cyan-500 hover:shadow-cyan-500/20">
            <div className="absolute top-1.5 w-16 h-3.5 bg-slate-950 rounded-full"></div>
            <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-slate-200 shadow-sm mb-3 bg-gradient-to-br from-purple-600 to-cyan-500 p-[1px]">
              <div className="relative w-full h-full rounded-[9px] overflow-hidden bg-white">
                <Image src="/logo.png" alt="Logo Android" fill sizes="50px" className="object-cover" />
              </div>
            </div>
            <p className="text-slate-900 font-black text-xs tracking-wide uppercase">Android App</p>
            <p className="text-slate-500 text-[9px] mt-1 font-normal leading-tight">App móvil para clientes y vendedores.</p>
            <div className="absolute bottom-1 w-12 h-0.5 bg-slate-400 rounded-full"></div>
          </div>

          {/* 🖥️ CONSOLA WEB */}
          <div className="absolute left-[15%] right-[15%] top-0 bottom-8 bg-white/60 backdrop-blur-xl rounded-2xl overflow-hidden flex flex-col ring-1 ring-black/10 z-10 transition-all duration-500 ease-out transform shadow-2xl border-4 border-slate-900
            group-hover/scene:scale-[1.04] group-hover/scene:z-30 group-hover/scene:bg-white/95
            hover:!scale-[1.06] hover:!z-50 hover:border-purple-600 hover:shadow-purple-500/20">
            <div className="h-8 bg-slate-900 border-b border-slate-800 flex items-center gap-2 px-4 justify-between transition-colors duration-500 group-hover/scene:bg-slate-950">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
              </div>
              <p className="text-slate-400 text-[9px] font-mono tracking-tight group-hover/scene:text-purple-400 lowercase">comprapp.net/dashboard</p>
              <div className="w-4"></div>
            </div>
            <div className="w-full flex-1 bg-white/10 p-6 flex flex-col items-center justify-center text-center">
              <div className="relative w-12 h-12 overflow-hidden rounded-xl border border-slate-200 shadow-md mb-3 bg-gradient-to-br from-purple-600 to-cyan-500 p-[1px]">
                <div className="relative w-full h-full rounded-[11px] overflow-hidden bg-white">
                  <Image src="/logo.png" alt="Logo PC" fill sizes="60px" className="object-cover" />
                </div>
              </div>
              <p className="text-slate-900 font-extrabold text-sm tracking-wide uppercase">Dashboard Web</p>
              <p className="text-slate-500 text-[10px] px-8 max-w-[280px] mt-1 font-normal leading-tight">Panel de gestión para vendedores — inventario, pedidos y reportes.</p>
            </div>
          </div>

          {/* 📱 VENDEDOR POS */}
          <div className="w-[32%] aspect-[3/4] bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border-[3px] border-slate-900 overflow-hidden flex flex-col items-center justify-center p-4 text-center ring-1 ring-black/10 self-end mb-2 cursor-pointer z-20
            transition-all duration-500 ease-out transform rotate-2
            group-hover/scene:translate-x-10 group-hover/scene:opacity-40 group-hover/scene:scale-95
            hover:!translate-x-0 hover:!opacity-100 hover:!scale-105 hover:!z-50 hover:border-purple-500 hover:shadow-purple-500/20">
            <div className="relative w-9 h-9 overflow-hidden rounded-xl border border-slate-200 shadow-sm mb-2 bg-gradient-to-br from-purple-600 to-cyan-500 p-[1px]">
              <div className="relative w-full h-full rounded-[8px] overflow-hidden bg-white">
                <Image src="/logo.png" alt="Logo POS" fill sizes="40px" className="object-cover" />
              </div>
            </div>
            <p className="text-slate-900 font-bold text-xs uppercase">Vendedor POS</p>
            <p className="text-slate-500 text-[9px] mt-1 max-w-[120px] font-normal leading-tight">Gestiona tu tienda y recibe pedidos en tiempo real.</p>
            <div className="absolute bottom-1 w-10 h-0.5 bg-slate-400 rounded-full"></div>
          </div>

        </div>
      </motion.div>

    </header>
  );
}