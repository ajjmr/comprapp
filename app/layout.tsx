import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"

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
  title: "Comprapp | Tu comercio local, digital",
  description:
    "Gestiona tu tienda local, recibe pedidos y conecta con tus clientes desde cualquier dispositivo.",
  keywords: [
    "marketplace",
    "comprapp",
    "comercio local",
    "tienda digital",
    "gestión de inventario",
    "pedidos online",
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
    title: "Comprapp | Tu comercio local, digital",
    description:
      "Gestiona tu tienda local, recibe pedidos y conecta con tus clientes desde cualquier dispositivo.",
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
    title: "Comprapp | Tu comercio local, digital",
    description:
      "Gestiona tu tienda local, recibe pedidos y conecta con tus clientes desde cualquier dispositivo.",
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
