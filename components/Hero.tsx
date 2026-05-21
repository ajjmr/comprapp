"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import DownloadButton from "@/components/DownloadButton";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  prompt(): Promise<void>;
}

export default function Hero() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setIsInstallable(false);
  };

  return (
    <header
      id="comenzar"
      className="container mx-auto px-6 py-16 md:py-32 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 relative z-10"
    >
      {/* BLOQUE IZQUIERDO */}
      <div className="flex-1 space-y-6 text-center lg:text-left w-full">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative w-50 h-50">
            <Image
              src="/logo.png"
              alt="Comprapp Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="bg-gradient-to-r from-purple-50 to-cyan-50 text-purple-700 text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full inline-block border border-purple-200/60 shadow-sm backdrop-blur-sm"
        >
          ⚡ Disponible para Ios, Android y PC
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-950 leading-[1.05]"
        >
          Tu mercado local,{" "}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
            en tu bolsillo
          </span>
        </motion.h1>

        {/* Párrafo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-base md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
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
          <DownloadButton className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:opacity-90 transition-all text-center flex items-center gap-3">
            <span className="text-2xl">📱💻</span>
            <div className="text-left">
              <p className="text-[12px] font-normal opacity-80">Descarga gratis</p>
              <p className="text-sm font-bold">DESCARGAR</p>
            </div>
          </DownloadButton>

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
          Versión actual:{" "}
          <span className="font-semibold text-slate-500">v1.2.0</span> · Android
          8.0+ requerido
        </motion.p>
      </div>

      {/* ESCENA MULTIPLATAFORMA */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="flex-1 flex justify-center w-full max-w-sm sm:max-w-md lg:max-w-none relative mt-4 lg:mt-0 group/scene"
      >
        {/* Luces de fondo (desktop) */}
        <div className="hidden lg:block absolute top-12 left-12 w-72 h-72 bg-purple-300 rounded-full blur-[90px] opacity-25 transition-all duration-700 group-hover/scene:opacity-35" />
        <div className="hidden lg:block absolute bottom-12 right-12 w-72 h-72 bg-cyan-300 rounded-full blur-[90px] opacity-25 transition-all duration-700 group-hover/scene:opacity-35" />

        {/* ── ESCENA MÓVIL (visible solo en < lg) ── */}
        <div className="flex lg:hidden justify-center items-center relative py-4 w-full">
          {/* Glow de fondo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 bg-purple-200 rounded-full blur-[70px] opacity-50 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-cyan-200 rounded-full blur-[50px] opacity-40 pointer-events-none" />

          {/* Teléfono */}
          <div className="relative w-36 z-10">
            <div className="relative bg-slate-900 rounded-[2.5rem] p-[3px] shadow-2xl">
              <div className="absolute left-0 top-[15%] bottom-[15%] w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-full" />
              <div className="absolute -right-[3px] top-[28%] w-[3px] h-8 bg-slate-700 rounded-r-full" />
              <div className="absolute -left-[3px] top-[22%] w-[3px] h-6 bg-slate-700 rounded-l-full" />
              <div className="absolute -left-[3px] top-[32%] w-[3px] h-10 bg-slate-700 rounded-l-full" />

              <div className="bg-gradient-to-b from-slate-50 to-white rounded-[2.3rem] overflow-hidden aspect-[9/19.5] flex flex-col">
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-20 h-5 bg-slate-900 rounded-full flex items-center justify-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-slate-600 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-slate-700 rounded-full" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-3 pb-3 text-center">
                  <div className="relative w-10 h-10 overflow-hidden rounded-2xl border border-slate-100 shadow-lg mb-2 bg-gradient-to-br from-purple-600 to-cyan-500 p-[1.5px]">
                    <div className="relative w-full h-full rounded-[12px] overflow-hidden bg-white">
                      <Image
                        src="/logo.png"
                        alt="App"
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-slate-900 font-black text-[9px] tracking-widest uppercase mb-1">
                    Comprapp
                  </p>
                  <p className="text-slate-400 text-[7px] leading-tight max-w-[70px]">
                    Android &amp; PC
                  </p>
                  <div className="mt-3 w-full space-y-1.5">
                    <div className="h-1.5 bg-slate-100 rounded-full w-full" />
                    <div className="h-1.5 bg-purple-100 rounded-full w-4/5 mx-auto" />
                    <div className="h-1.5 bg-cyan-100 rounded-full w-3/5 mx-auto" />
                  </div>
                </div>
                <div className="flex justify-center pb-2">
                  <div className="w-14 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── ESCENA DESKTOP (visible solo en >= lg) ── */}
        <div className="relative w-full min-h-[500px] hidden lg:flex items-center justify-between p-2">

          {/* ── TELÉFONO ANDROID ── */}
          <div className="relative w-[38%] self-end mb-4 z-20 cursor-pointer
            transition-all duration-500 ease-out -rotate-3
            group-hover/scene:-translate-x-4 group-hover/scene:opacity-50 group-hover/scene:scale-95
            hover:!translate-x-0 hover:!opacity-100 hover:!scale-[1.04] hover:!z-50 hover:!-rotate-1">
            <div className="relative bg-slate-900 rounded-[2.5rem] p-[3px] shadow-2xl">
              <div className="absolute left-0 top-[15%] bottom-[15%] w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-full" />
              <div className="absolute -right-[3px] top-[28%] w-[3px] h-8 bg-slate-700 rounded-r-full" />
              <div className="absolute -left-[3px] top-[22%] w-[3px] h-6 bg-slate-700 rounded-l-full" />
              <div className="absolute -left-[3px] top-[32%] w-[3px] h-10 bg-slate-700 rounded-l-full" />
              <div className="absolute -left-[3px] top-[46%] w-[3px] h-10 bg-slate-700 rounded-l-full" />

              <div className="bg-gradient-to-b from-slate-50 to-white rounded-[2.3rem] overflow-hidden aspect-[9/19.5] flex flex-col">
                <div className="flex justify-center pt-3 pb-1">
                  <div className="w-20 h-5 bg-slate-900 rounded-full flex items-center justify-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-slate-600 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-slate-700 rounded-full" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4 text-center">
                  <div className="relative w-12 h-12 overflow-hidden rounded-2xl border border-slate-100 shadow-lg mb-3 bg-gradient-to-br from-purple-600 to-cyan-500 p-[1.5px]">
                    <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-white">
                      <Image
                        src="/logo.png"
                        alt="App"
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-slate-900 font-black text-[10px] tracking-widest uppercase mb-1">
                    Android App
                  </p>
                  <p className="text-slate-400 text-[8px] leading-tight max-w-[80px]">
                    Clientes y vendedores
                  </p>
                  <div className="mt-4 w-full space-y-1.5">
                    <div className="h-1.5 bg-slate-100 rounded-full w-full" />
                    <div className="h-1.5 bg-purple-100 rounded-full w-4/5 mx-auto" />
                    <div className="h-1.5 bg-slate-100 rounded-full w-3/5 mx-auto" />
                  </div>
                </div>
                <div className="flex justify-center pb-2">
                  <div className="w-16 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* ── PANTALLA PC / DASHBOARD ── */}
          <div className="absolute left-[10%] right-[10%] top-0 bottom-16 z-10 cursor-pointer
            transition-all duration-500 ease-out
            group-hover/scene:scale-[1.03] group-hover/scene:z-30
            hover:!scale-[1.05] hover:!z-50">
            <div className="bg-slate-900 rounded-2xl p-[3px] shadow-2xl h-full flex flex-col">
              <div className="bg-slate-800 rounded-t-xl px-4 py-2 flex items-center gap-2 justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-slate-700 rounded-md px-3 py-1 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <p className="text-slate-400 text-[8px] font-mono">
                      comprapp.net/dashboard
                    </p>
                  </div>
                </div>
                <div className="w-6" />
              </div>
              <div className="flex-1 bg-gradient-to-br from-slate-50 to-white rounded-b-xl p-4 flex flex-col items-center justify-center text-center">
                <div className="relative w-14 h-14 overflow-hidden rounded-2xl border border-slate-100 shadow-lg mb-3 bg-gradient-to-br from-purple-600 to-cyan-500 p-[1.5px]">
                  <div className="relative w-full h-full rounded-[13px] overflow-hidden bg-white">
                    <Image
                      src="/logo.png"
                      alt="Dashboard"
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="text-slate-900 font-extrabold text-xs tracking-widest uppercase mb-1">
                  Dashboard Web
                </p>
                <p className="text-slate-400 text-[9px] max-w-[180px] leading-tight">
                  Inventario, pedidos y reportes en tiempo real
                </p>
                <div className="mt-5 w-full grid grid-cols-3 gap-2">
                  <div className="bg-purple-50 border border-purple-100 rounded-lg p-2">
                    <div className="h-1 bg-purple-200 rounded w-full mb-1" />
                    <div className="h-1 bg-purple-100 rounded w-2/3" />
                  </div>
                  <div className="bg-cyan-50 border border-cyan-100 rounded-lg p-2">
                    <div className="h-1 bg-cyan-200 rounded w-full mb-1" />
                    <div className="h-1 bg-cyan-100 rounded w-3/4" />
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-2">
                    <div className="h-1 bg-slate-200 rounded w-full mb-1" />
                    <div className="h-1 bg-slate-100 rounded w-1/2" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-1">
              <div className="w-12 h-1 bg-slate-700 rounded-full" />
            </div>
          </div>

          {/* ── TABLET / VENDEDOR POS ── */}
          <div className="relative w-[50%] self-end mb-0 z-20 cursor-pointer
            transition-all duration-500 ease-out rotate-2
            group-hover/scene:translate-x-4 group-hover/scene:opacity-50 group-hover/scene:scale-95
            hover:!translate-x-0 hover:!opacity-100 hover:!scale-[1.04] hover:!z-50 hover:!rotate-1">
            <div className="relative bg-slate-900 rounded-[1.8rem] p-[3px] shadow-2xl">
              <div className="absolute left-0 top-[10%] bottom-[10%] w-[2px] bg-gradient-to-b from-transparent via-white/15 to-transparent rounded-full" />
              <div className="absolute -right-[3px] top-[20%] w-[3px] h-10 bg-slate-700 rounded-r-full" />
              <div className="absolute -top-[3px] right-[25%] h-[3px] w-8 bg-slate-700 rounded-t-full" />

              <div className="bg-gradient-to-b from-slate-50 to-white rounded-[1.6rem] overflow-hidden aspect-[3/4] flex flex-col">
                <div className="flex justify-center pt-2.5 pb-1">
                  <div className="w-2 h-2 bg-slate-800 rounded-full" />
                </div>
                <div className="flex-1 flex flex-col items-center justify-center px-4 pb-4 text-center">
                  <div className="relative w-11 h-11 overflow-hidden rounded-2xl border border-slate-100 shadow-lg mb-3 bg-gradient-to-br from-purple-600 to-cyan-500 p-[1.5px]">
                    <div className="relative w-full h-full rounded-[13px] overflow-hidden bg-white">
                      <Image
                        src="/logo.png"
                        alt="POS"
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <p className="text-slate-900 font-black text-[9px] tracking-widest uppercase mb-1">
                    Vendedor POS
                  </p>
                  <p className="text-slate-400 text-[8px] leading-tight max-w-[90px]">
                    Pedidos en tiempo real
                  </p>
                  <div className="mt-4 w-full space-y-1.5">
                    <div className="h-1.5 bg-slate-100 rounded-full w-full" />
                    <div className="h-1.5 bg-cyan-100 rounded-full w-4/5 mx-auto" />
                    <div className="h-1.5 bg-slate-100 rounded-full w-2/3 mx-auto" />
                  </div>
                </div>
                <div className="flex justify-center pb-2">
                  <div className="w-12 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </motion.div>
    </header>
  );
}
