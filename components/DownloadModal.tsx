"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const IconGooglePlay = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
    <path d="M3 20.5v-17c0-.8.9-1.3 1.6-.8l14 8.5c.7.4.7 1.4 0 1.8l-14 8.5C3.9 21.8 3 21.3 3 20.5z" />
  </svg>
);

const IconApple = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const IconAndroid = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
    <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C14.19 1.23 13.12 1 12 1c-1.12 0-2.19.23-3.14.63L7.38.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.3 1.3C6.34 3.26 5 5.01 5 7h14c0-1.99-1.34-3.74-3.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z" />
  </svg>
);

const IconGlobe = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const IconWindows = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
    <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0 opacity-70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default function DownloadModal({ isOpen, onClose }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-slate-100">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-slate-500"
                aria-label="Cerrar modal"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h2 className="text-xl font-extrabold text-slate-900 pr-8">Descarga COMPRAPP</h2>
              <p className="text-sm text-slate-500 mt-0.5">Elige tu plataforma</p>
            </div>

            {/* Options */}
            <div className="p-4 space-y-2.5">

              {/* A) Google Play - disabled */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 cursor-not-allowed select-none">
                <span className="flex-shrink-0 text-green-500">
                  <IconGooglePlay />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-600">Google Play</p>
                  <p className="text-xs text-slate-400">Próximamente</p>
                </div>
                <span className="text-[11px] font-semibold bg-slate-200 text-slate-500 px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
                  Próximamente
                </span>
              </div>

              {/* B) App Store - disabled */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 cursor-not-allowed select-none">
                <span className="flex-shrink-0 text-slate-700">
                  <IconApple />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-600">App Store</p>
                  <p className="text-xs text-slate-400">Próximamente</p>
                </div>
                <span className="text-[11px] font-semibold bg-slate-200 text-slate-500 px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
                  Próximamente
                </span>
              </div>

              {/* C) Android APK - active */}
              <a
                href="/downloads/comprapp.apk"
                download
                onClick={onClose}
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white cursor-pointer hover:opacity-90 transition-opacity"
              >
                <span className="flex-shrink-0">
                  <IconAndroid />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">Android APK</p>
                  <p className="text-xs text-white/80 truncate">Descarga directa · v1.2.0</p>
                </div>
                <ChevronRight />
              </a>

              {/* D) Dashboard Web - active */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white cursor-pointer hover:opacity-90 transition-opacity"
              >
                <span className="flex-shrink-0">
                  <IconGlobe />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm">Dashboard Web</p>
                  <p className="text-xs text-white/80 truncate">Para vendedores · Abre en el navegador</p>
                </div>
                <ChevronRight />
              </a>

              {/* E) Windows - disabled */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 cursor-not-allowed select-none">
                <span className="flex-shrink-0 text-blue-500">
                  <IconWindows />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-600">Windows</p>
                  <p className="text-xs text-slate-400">Próximamente</p>
                </div>
                <span className="text-[11px] font-semibold bg-slate-200 text-slate-500 px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
                  Próximamente
                </span>
              </div>

            </div>

            {/* Footer note */}
            <div className="px-6 pb-5 text-center">
              <p className="text-xs text-slate-400">Android 8.0+ requerido para la app móvil</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
