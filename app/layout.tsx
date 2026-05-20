import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Comprapp | Escala tu negocio sin fronteras",
  description: "El ecosistema de marketplace diseñado para economías dinámicas. Gestiona stock, sincroniza divisas en tiempo real y recibe pagos globales.",
  openGraph: {
    title: "Comprapp | Escala tu negocio sin fronteras",
    description: "Gestiona stock, sincroniza divisas en tiempo real y recibe pagos globales en iPhone, Android o PC.",
    url: "https://comprapp.net",
    siteName: "Comprapp",
    images: [
      {
        url: "/og-image.png", // Asegúrate de subir una foto con este nombre a tu carpeta /public
        width: 1200,
        height: 630,
        alt: "Comprapp Consola Web Enterprise",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
