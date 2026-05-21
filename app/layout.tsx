import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Comprapp | Escala tu negocio sin fronteras",
  description:
    "El ecosistema de marketplace diseñado para economías dinámicas. Gestiona stock, sincroniza divisas en tiempo real y recibe pagos globales.",
  keywords: [
    "marketplace",
    "comprapp",
    "comercio local",
    "Venezuela",
    "BCV",
    "tasa",
    "Android",
    "tienda online",
    "pos",
    "inventario",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Comprapp | Escala tu negocio sin fronteras",
    description:
      "Gestiona stock, sincroniza divisas en tiempo real y recibe pagos globales en iPhone, Android o PC.",
    url: "https://comprapp.net",
    siteName: "Comprapp",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Comprapp Consola Web Enterprise",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comprapp | Escala tu negocio sin fronteras",
    description:
      "Gestiona stock, sincroniza divisas en tiempo real y recibe pagos globales.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
