export interface CmsVersion {
  number: string;
  date: string;
  title: string;
  status: "done" | "current" | "upcoming";
  features: string[];
}

export interface CmsFeature {
  icon: string;
  title: string;
  description: string;
}

export interface LandingConfig {
  hero: {
    title: string;
    subtitle: string;
    buttonPlayStore: string;
    buttonWeb: string;
  };
  stats: {
    stores: string;
    users: string;
    cities: string;
  };
  phones: {
    image1: string;
    image2: string;
    image3: string;
  };
  sellers: {
    title: string;
    subtitle: string;
    button: string;
  };
  buyers: {
    title: string;
    subtitle: string;
    button: string;
  };
  banner: {
    active: boolean;
    message: string;
    color: "purple" | "amber" | "red" | "green";
  };
  versions: CmsVersion[];
  features: CmsFeature[];
  whyChoose: {
    title: string;
    reasons: CmsFeature[];
  };
  navbar: {
    links: string[];
  };
}

export const DEFAULT_LANDING_CONFIG: LandingConfig = {
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
        "Interfaz nativa Android",
      ],
    },
    {
      number: "v1.4.3",
      date: "Junio 2026",
      title: "Comercio Local Completo",
      status: "current",
      features: [
        "Tasas de cambio BCV en tiempo real",
        "Sistema de pedidos, carrito y confirmación",
        "Dashboard web para vendedores",
        "Notificaciones push en tiempo real",
        "Sistema de fiado y cupones",
        "Chat en tiempo real",
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
      ],
    },
  ],
  features: [
    { icon: "🔄", title: "Multi-Moneda", description: "Bs. y USD con tasa BCV actualizada automáticamente en tiempo real." },
    { icon: "📦", title: "Inventario Digital", description: "Gestiona tu stock, alertas de stock bajo y catálogo desde cualquier dispositivo." },
    { icon: "⭐", title: "Fidelización", description: "Tarjetas de sellos digitales, cupones y sistema de puntos para tus clientes." },
    { icon: "📡", title: "Modo Offline", description: "Continúa operando sin internet con caché local de catálogos." },
  ],
  whyChoose: {
    title: "¿Por qué COMPRAPP?",
    reasons: [
      { icon: "💜", title: "Hecho para Venezuela", description: "Bs. y USD con tasa BCV en tiempo real, adaptado al contexto económico local." },
      { icon: "⚡", title: "Instalación Inmediata", description: "Descarga en segundos o accede desde el navegador, sin pasos complicados." },
      { icon: "🔗", title: "Sincronización Total", description: "Tus datos se mantienen idénticos en la app y en el panel web en tiempo real." },
      { icon: "🔒", title: "Seguridad Firebase", description: "Respaldo en la nube con Firebase bajo estándares ISO 27001." },
      { icon: "📈", title: "Escalabilidad", description: "Optimizado para responder rápido sin importar cuántos productos tengas." },
      { icon: "🤝", title: "Comunidad Local", description: "Conecta compradores y vendedores de tu misma zona o ciudad." },
    ],
  },
  navbar: {
    links: ["Funciones", "Versiones", "Descargar"],
  },
};
