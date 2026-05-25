"use client";

import { useState, ReactNode } from "react";
import DownloadModal from "@/components/DownloadModal";

interface Props {
  className?: string;
  children: ReactNode;
}

export default function DownloadButton({ className, children }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setIsModalOpen(true)}
        aria-label="Abrir opciones de descarga"
      >
        {children}
      </button>
      <DownloadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
