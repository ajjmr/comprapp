/**
 * init-cms.js — Inicializa landing_config/content en Firestore con datos reales de COMPRAPP.
 *
 * Requisitos:
 *   1. npm install firebase-admin  (solo una vez)
 *   2. Descargar Service Account Key desde Firebase Console:
 *      Configuración del proyecto → Cuentas de servicio → Generar nueva clave privada
 *      Guardar como scripts/serviceAccountKey.json (NO subir a git)
 *   3. node scripts/init-cms.js
 *
 * El script NO sobreescribe si el documento ya existe.
 * Para forzar la escritura: node scripts/init-cms.js --force
 */

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { existsSync } = require("fs");
const path = require("path");

const KEY_PATH = path.join(__dirname, "serviceAccountKey.json");
const FORCE = process.argv.includes("--force");

if (!existsSync(KEY_PATH)) {
  console.error(`\n❌ No se encontró: ${KEY_PATH}`);
  console.error("   Descárgala desde Firebase Console → Configuración → Cuentas de servicio\n");
  process.exit(1);
}

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const CMS_DATA = {
  hero: {
    title: "Tu comercio local, digital",
    subtitle: "Conectamos compradores y vendedores venezolanos",
    buttonPlayStore: "Descargar en Google Play",
    buttonWeb: "Acceder desde web",
  },
  stats: {
    stores: "100+",
    users: "500+",
    cities: "5+",
  },
  phones: {
    image1: "",
    image2: "",
    image3: "",
  },
  sellers: {
    title: "¿Tienes un negocio?",
    subtitle: "Gestiona tu tienda desde donde estés",
    button: "Crear mi tienda",
  },
  buyers: {
    title: "¿Quieres comprar local?",
    subtitle: "Encuentra tiendas cerca de ti",
    button: "Descargar app",
  },
  banner: {
    active: false,
    message: "",
    color: "purple",
  },
  versions: [
    {
      number: "v1.0.0",
      date: "2024",
      title: "Infraestructura Core",
      status: "done",
      features: [
        "Base de datos distribuida con Firebase",
        "Autenticación de usuarios y sesiones",
        "Interfaz nativa Android de alto rendimiento",
      ],
    },
    {
      number: "v1.4.3",
      date: "Junio 2026",
      title: "Comercio Local Completo",
      status: "current",
      features: [
        "Tasas de cambio BCV en tiempo real",
        "Sistema de pedidos, carrito y confirmación animada",
        "Dashboard web para vendedores — inventario, pedidos y fiado",
        "Notificaciones push en tiempo real (FCM)",
        "Sistema de fiado (crédito informal)",
        "Cupones y sistema de fidelización con sellos",
        "Chat en tiempo real entre comprador y vendedor",
        "Modo offline con caché local de catálogos",
        "App Check + Firestore Security Rules",
        "Cloud Functions: rate limiting, stock, notificaciones",
      ],
    },
    {
      number: "v2.0.0",
      date: "Próximamente",
      title: "Expansión y Escala",
      status: "upcoming",
      features: [
        "Mobile POS con escáner de cámara",
        "App para iOS",
        "Pagos integrados (Binance Pay, USDT)",
        "Tracking delivery en tiempo real",
        "Búsqueda full-text (Algolia)",
        "2FA para vendedores",
        "Plan premium con monetización",
        "Expansión Latam",
      ],
    },
  ],
  features: [
    {
      icon: "🔄",
      title: "Multi-Moneda",
      description: "Bs. y USD con tasa BCV actualizada automáticamente en tiempo real.",
    },
    {
      icon: "📦",
      title: "Inventario Digital",
      description: "Gestiona tu stock, alertas de bajo inventario y catálogo desde cualquier dispositivo.",
    },
    {
      icon: "⭐",
      title: "Fidelización",
      description: "Tarjetas de sellos digitales, cupones y sistema de puntos para tus clientes.",
    },
    {
      icon: "📡",
      title: "Modo Offline",
      description: "Continúa operando sin internet con caché local de catálogos y pedidos.",
    },
    {
      icon: "💬",
      title: "Chat en Tiempo Real",
      description: "Comunicación directa entre compradores y vendedores dentro de la app.",
    },
    {
      icon: "🔒",
      title: "Seguridad Empresarial",
      description: "Firebase App Check, Firestore Rules y datos cifrados en tránsito con TLS.",
    },
  ],
  whyChoose: {
    title: "¿Por qué COMPRAPP?",
    reasons: [
      {
        icon: "💜",
        title: "Hecho para Venezuela",
        description: "Bs. y USD con tasa BCV en tiempo real, adaptado al contexto económico local.",
      },
      {
        icon: "⚡",
        title: "Instalación Inmediata",
        description: "Descarga en segundos desde Play Store o accede desde el navegador sin pasos complicados.",
      },
      {
        icon: "🔗",
        title: "Sincronización Total",
        description: "Tus datos se mantienen idénticos en la app móvil y en el panel web en tiempo real.",
      },
      {
        icon: "📡",
        title: "Operaciones Resilientes",
        description: "Continúa gestionando inventario de forma local aunque falle la conexión a internet.",
      },
      {
        icon: "🔒",
        title: "Seguridad Firebase",
        description: "Respaldo en la nube con Firebase bajo estándares ISO 27001, SOC 1, SOC 2 y SOC 3.",
      },
      {
        icon: "📈",
        title: "Escalabilidad Elástica",
        description: "Optimizado para responder rápido sin importar cuántos productos o tiendas cargues.",
      },
    ],
  },
  navbar: {
    links: ["Funciones", "Versiones", "Descargar"],
  },
};

async function main() {
  const ref = db.collection("landing_config").doc("content");
  const snap = await ref.get();

  if (snap.exists && !FORCE) {
    console.log("ℹ️  El documento landing_config/content ya existe.");
    console.log("   Usa --force para sobreescribir: node scripts/init-cms.js --force\n");
    process.exit(0);
  }

  await ref.set(CMS_DATA);
  console.log("✅ landing_config/content inicializado correctamente en Firestore.");
  console.log(`   Proyecto: comprapp-da702`);
  console.log(`   Versiones cargadas: ${CMS_DATA.versions.length}`);
  console.log(`   Features cargadas: ${CMS_DATA.features.length}`);
  console.log(`   Razones "Por que": ${CMS_DATA.whyChoose.reasons.length}\n`);
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
