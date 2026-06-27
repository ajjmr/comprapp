"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import DownloadButton from "@/components/DownloadButton";
import { useLandingConfig } from "@/lib/hooks/useLandingConfig";

const NAV_HREFS = ["#funciones", "#roadmap", "download"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { config } = useLandingConfig();
  const labels = config.navbar.links;

  const navItems = NAV_HREFS.map((href, i) => ({
    href,
    label: labels[i] ?? "",
    isDownload: href === "download",
  }));

  return (
    <nav className="bg-white/70 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50 shadow-sm shadow-slate-100/50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
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

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) =>
            item.isDownload ? (
              <DownloadButton
                key={item.label}
                className="bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold px-6 py-2.5 rounded-full transition-all shadow-lg border border-white/10 hover:scale-105 transform duration-200 inline-block"
              >
                {item.label}
              </DownloadButton>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-bold text-slate-600 hover:text-cyan-600 transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* HAMBURGER */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
        >
          <span className={`block w-full h-0.5 bg-slate-800 rounded-full transition-all duration-200 origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-full h-0.5 bg-slate-800 rounded-full transition-all duration-200 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
          <span className={`block w-full h-0.5 bg-slate-800 rounded-full transition-all duration-200 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 py-5 flex flex-col gap-3">
          {navItems.map((item) =>
            item.isDownload ? (
              <DownloadButton
                key={item.label}
                className="mt-1 bg-slate-950 text-white text-sm font-bold px-6 py-3 rounded-full transition-all shadow-md text-center w-full inline-block"
              >
                {item.label}
              </DownloadButton>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-bold text-slate-700 hover:text-cyan-600 transition-colors py-2 border-b border-slate-100"
              >
                {item.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  );
}
