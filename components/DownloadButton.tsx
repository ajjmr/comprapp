"use client";

import { useEffect, useState, ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export default function DownloadButton({ className, children }: Props) {
  const [apkAvailable, setApkAvailable] = useState<boolean | null>(null);
  const [showMsg, setShowMsg] = useState(false);

  useEffect(() => {
    fetch("/downloads/comprapp.apk", { method: "HEAD" })
      .then((res) => setApkAvailable(res.ok))
      .catch(() => setApkAvailable(false));
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (apkAvailable === false) {
      e.preventDefault();
      setShowMsg(true);
      setTimeout(() => setShowMsg(false), 3000);
    }
  };

  return (
    <span className="relative inline-block">
      <a
        href="/downloads/comprapp.apk"
        download
        className={className}
        onClick={handleClick}
        aria-label="Descargar Comprapp APK"
      >
        {children}
      </a>
      {showMsg && (
        <span
          role="alert"
          className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-medium px-4 py-2 rounded-lg shadow-xl whitespace-nowrap z-50 pointer-events-none"
        >
          📦 APK próximamente disponible
        </span>
      )}
    </span>
  );
}
