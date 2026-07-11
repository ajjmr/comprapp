"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLandingConfig } from "@/lib/hooks/useLandingConfig";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
  prompt(): Promise<void>;
}

const BASE_CLIENT_SCREENSHOTS = [
  "/images/screenshots/mobile/stores.jpg",
  "/images/screenshots/mobile/product_detail.jpg",
  "/images/screenshots/mobile/cart.jpg",
  "/images/screenshots/mobile/order_success.jpg",
  "/images/screenshots/mobile/stores_favorites.jpg",
];

const BASE_SELLER_SCREENSHOTS = [
  "/images/screenshots/mobile/seller_home.jpg",
  "/images/screenshots/mobile/pos_mobile.jpg",
  "/images/screenshots/mobile/chat.jpg",
];

const BASE_DASHBOARD_SCREENSHOTS = [
  "/images/screenshots/web/dashboard.png",
  "/images/screenshots/web/reports.png",
  "/images/screenshots/web/inventory.png",
  "/images/screenshots/web/orders_web.png",
  "/images/screenshots/web/pos_web.png",
];

function useSlideshow(images: string[], intervalMs = 3000) {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setPrev(current);
        setCurrent((c) => (c + 1) % images.length);
        setTransitioning(false);
      }, 700);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [current, images.length, intervalMs]);

  return { current, prev, transitioning };
}

export default function Hero() {
  const { config } = useLandingConfig();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  const clientScreenshots = config.phones.image1
    ? [config.phones.image1, ...BASE_CLIENT_SCREENSHOTS]
    : BASE_CLIENT_SCREENSHOTS;
  const sellerScreenshots = config.phones.image2
    ? [config.phones.image2, ...BASE_SELLER_SCREENSHOTS]
    : BASE_SELLER_SCREENSHOTS;
  const dashboardScreenshots = config.phones.image3
    ? [config.phones.image3, ...BASE_DASHBOARD_SCREENSHOTS]
    : BASE_DASHBOARD_SCREENSHOTS;

  const client = useSlideshow(clientScreenshots, 5000);
  const seller = useSlideshow(sellerScreenshots, 5500);
  const dashboard = useSlideshow(dashboardScreenshots, 6000);

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
      <style>{`
        @keyframes scrollDashboard {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .slide-enter { opacity: 0; transform: scale(1.04); }
        .slide-active { opacity: 1; transform: scale(1); transition: opacity 0.4s ease, transform 0.4s ease; }
        .slide-exit  { opacity: 0; transform: scale(0.96); transition: opacity 0.4s ease, transform 0.4s ease; }
      `}</style>

      {/* BLOQUE IZQUIERDO */}
      <div className="flex-1 space-y-6 text-center lg:text-left w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex justify-center lg:justify-start"
        >
          <div className="relative w-50 h-50">
            <Image src="/logo.png" alt="Comprapp Logo" fill className="object-contain" priority />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="flex justify-center lg:justify-start"
        >
          <span className="text-2xl font-black tracking-wider uppercase text-slate-900">
            COMPR<span className="bg-gradient-to-r from-purple-600 to-cyan-500 bg-clip-text text-transparent">APP</span>
          </span>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="bg-gradient-to-r from-purple-50 to-cyan-50 text-purple-700 text-[10px] font-black tracking-widest uppercase px-4 py-1.5 rounded-full inline-block border border-purple-200/60 shadow-sm backdrop-blur-sm"
        >
          ⚡ Disponible para Android y PC
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-950 leading-[1.05]"
        >
          <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
            {config.hero.title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-base md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
        >
          {config.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          className="flex flex-wrap gap-4 justify-center lg:justify-start pt-6"
        >
          <a
            href="https://play.google.com/store/apps/details?id=com.jotasystem.comprapp&pli=1"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:opacity-90 transition-all text-center flex items-center gap-3"
          >
            <span className="text-2xl">📱</span>
            <div className="text-left">
              <p className="text-[10px] font-normal opacity-80">Descarga gratis</p>
              <p className="text-sm font-bold">{config.hero.buttonPlayStore}</p>
            </div>
          </a>

          <Link
            href="https://app.comprapp.net"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-950 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:bg-slate-800 transition-all text-center flex items-center gap-3"
          >
            <span className="text-2xl">💻</span>
            <div className="text-left">
              <p className="text-[10px] font-normal opacity-60">Acceder desde</p>
              <p className="text-sm font-bold">{config.hero.buttonWeb} →</p>
            </div>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="text-xs text-slate-400 pt-2"
        >
          Versión actual: <span className="font-semibold text-slate-500">v1.4.3</span>
        </motion.p>
      </div>

      {/* ESCENA MULTIPLATAFORMA */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="flex-1 flex justify-center w-full max-w-sm sm:max-w-md lg:max-w-none relative mt-4 lg:mt-0 group/scene"
      >
        <div className="hidden lg:block absolute top-12 left-12 w-72 h-72 bg-purple-300 rounded-full blur-[90px] opacity-25 transition-all duration-700 group-hover/scene:opacity-35" />
        <div className="hidden lg:block absolute bottom-12 right-12 w-72 h-72 bg-cyan-300 rounded-full blur-[90px] opacity-25 transition-all duration-700 group-hover/scene:opacity-35" />

        {/* ESCENA MÓVIL */}
        <div className="flex lg:hidden justify-center items-center relative py-4 w-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 bg-purple-200 rounded-full blur-[70px] opacity-50 pointer-events-none" />
          <div className="relative w-36 z-10">
            <div className="relative bg-slate-900 rounded-[2.5rem] p-[3px] shadow-2xl">
              <div className="absolute left-0 top-[15%] bottom-[15%] w-[2px] bg-gradient-to-b from-transparent via-white/20 to-transparent rounded-full" />
              <div className="absolute -right-[3px] top-[28%] w-[3px] h-8 bg-slate-700 rounded-r-full" />
              <div className="absolute -left-[3px] top-[22%] w-[3px] h-6 bg-slate-700 rounded-l-full" />
              <div className="absolute -left-[3px] top-[32%] w-[3px] h-10 bg-slate-700 rounded-l-full" />
              <div className="relative rounded-[2.3rem] overflow-hidden aspect-[9/19.5]">
                {clientScreenshots.map((src, i) => (
                  <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-500 ${i === client.current ? "opacity-100" : "opacity-0"}`}
                  >
                    <Image src={src} alt="App cliente" fill sizes="144px" className="object-cover object-top" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ESCENA DESKTOP */}
        <div className="relative w-full min-h-[500px] hidden lg:flex items-center justify-between p-2">

          {/* TELÉFONO ANDROID — CLIENTE */}
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
              <div className="relative rounded-[2.3rem] overflow-hidden aspect-[9/19.5]">
                {clientScreenshots.map((src, i) => (
                  <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-500 ${i === client.current ? "opacity-100" : "opacity-0"}`}
                  >
                    <Image src={src} alt="App cliente" fill sizes="38vw" className="object-cover object-top" />
                  </div>
                ))}
              </div>
            </div>
            {/* Dots indicadores */}
            <div className="flex justify-center gap-1 mt-2">
              {clientScreenshots.map((_, i) => (
                <div key={i} className={`rounded-full transition-all duration-300 ${i === client.current ? "w-3 h-1.5 bg-purple-500" : "w-1.5 h-1.5 bg-slate-300"}`} />
              ))}
            </div>
          </div>

          {/* PANTALLA PC / DASHBOARD */}
          <div className="absolute left-[5%] right-[5%] top-0 bottom-16 z-10 cursor-pointer
            transition-all duration-500 ease-out
            group-hover/scene:scale-[1.03] group-hover/scene:z-30
            hover:!scale-[1.05] hover:!z-50">
            <div className="bg-slate-900 rounded-2xl p-[3px] shadow-2xl flex flex-col">
              <div className="bg-slate-800 rounded-t-xl px-4 py-2 flex items-center gap-2 justify-between">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-green-400 rounded-full" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-slate-700 rounded-md px-3 py-1 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    <p className="text-slate-400 text-[8px] font-mono">comprapp.net/dashboard</p>
                  </div>
                </div>
                <div className="w-6" />
              </div>
              <div className="relative overflow-hidden rounded-b-xl aspect-[16/10]">
                {dashboardScreenshots.map((src, i) => (
                  <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-700 ${i === dashboard.current ? "opacity-100" : "opacity-0"}`}
                  >
                    <Image src={src} alt="Dashboard web" fill sizes="90vw" className="object-cover object-top" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-1">
              <div className="w-12 h-1 bg-slate-700 rounded-full" />
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-1 mt-1">
              {dashboardScreenshots.map((_, i) => (
                <div key={i} className={`rounded-full transition-all duration-300 ${i === dashboard.current ? "w-3 h-1.5 bg-purple-500" : "w-1.5 h-1.5 bg-slate-300"}`} />
              ))}
            </div>
          </div>

          {/* TABLET / VENDEDOR */}
          <div className="relative w-[50%] self-end mb-0 z-20 cursor-pointer
            transition-all duration-500 ease-out rotate-2
            group-hover/scene:translate-x-4 group-hover/scene:opacity-50 group-hover/scene:scale-95
            hover:!translate-x-0 hover:!opacity-100 hover:!scale-[1.04] hover:!z-50 hover:!rotate-1">
            <div className="relative bg-slate-900 rounded-[1.8rem] p-[3px] shadow-2xl">
              <div className="absolute left-0 top-[10%] bottom-[10%] w-[2px] bg-gradient-to-b from-transparent via-white/15 to-transparent rounded-full" />
              <div className="absolute -right-[3px] top-[20%] w-[3px] h-10 bg-slate-700 rounded-r-full" />
              <div className="absolute -top-[3px] right-[25%] h-[3px] w-8 bg-slate-700 rounded-t-full" />
              <div className="relative rounded-[1.6rem] overflow-hidden aspect-[3/4]">
                {sellerScreenshots.map((src, i) => (
                  <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-500 ${i === seller.current ? "opacity-100" : "opacity-0"}`}
                  >
                    <Image src={src} alt="Vendedor" fill sizes="50vw" className="object-cover object-top" />
                  </div>
                ))}
              </div>
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-1 mt-2">
              {sellerScreenshots.map((_, i) => (
                <div key={i} className={`rounded-full transition-all duration-300 ${i === seller.current ? "w-3 h-1.5 bg-purple-500" : "w-1.5 h-1.5 bg-slate-300"}`} />
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </header>
  );
}