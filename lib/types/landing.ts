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
};
