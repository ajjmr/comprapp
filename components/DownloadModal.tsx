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



const IconGlobe = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
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

              {/* 1) Google Play — activo */}
              <a
                href="https://play.google.com/store/apps/details?id=com.jotasystem.comprapp&pli=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors cursor-pointer"
                onClick={onClose}
              >
                <span className="flex-shrink-0 text-green-500">
                  <IconGooglePlay />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-800">Google Play</p>
                  <p className="text-xs text-slate-500">Android 8.0+</p>
                </div>
                <ChevronRight />
              </a>

              {/* 2) Navegador Web — activo */}
              <a
                href="https://app.comprapp.net"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer"
                onClick={onClose}
              >
                <span className="flex-shrink-0 text-blue-500">
                  <IconGlobe />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-800">Navegador Web</p>
                  <p className="text-xs text-slate-500">app.comprapp.net</p>
                </div>
                <ChevronRight />
              </a>

              {/* 3) App Store iOS — próximamente */}
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 cursor-not-allowed select-none opacity-60">
                <span className="flex-shrink-0 text-slate-400">
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-500">App Store</p>
                  <p className="text-xs text-slate-400">iOS — En desarrollo</p>
                </div>
                <span className="text-[11px] font-semibold bg-slate-200 text-slate-500 px-2.5 py-1 rounded-full flex-shrink-0 whitespace-nowrap">
                  Próximamente
                </span>
              </div>

            </div>

            {/* Footer note */}
            <div className="px-6 pb-5 text-center">
              <p className="text-xs text-slate-400">Android 8.0+ requerido para la app móvil</p>
              <p className="text-xs text-slate-500 mt-3 font-medium">
                Síguenos para ser el primero en saber cuando lancemos 🎉
              </p>
              <div className="flex justify-center gap-3 mt-2">
                <a
                  href="https://www.instagram.com/somoscomprapp?igsh=aWhzcWkyYjZ5NWRs&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-50 rounded-full text-xs font-semibold text-pink-600 hover:bg-pink-100 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="ig-modal-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f09433" />
                        <stop offset="25%" stopColor="#e6683c" />
                        <stop offset="50%" stopColor="#dc2743" />
                        <stop offset="75%" stopColor="#cc2366" />
                        <stop offset="100%" stopColor="#bc1888" />
                      </linearGradient>
                    </defs>
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="url(#ig-modal-grad)" strokeWidth="2" />
                    <circle cx="12" cy="12" r="4" stroke="url(#ig-modal-grad)" strokeWidth="2" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="url(#ig-modal-grad)" />
                  </svg>
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/share/18n9EkSRFr/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full text-xs font-semibold text-blue-600 hover:bg-blue-100 transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 flex-shrink-0" fill="#1877F2" aria-hidden="true">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
