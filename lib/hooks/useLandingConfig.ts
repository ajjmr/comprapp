"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { LandingConfig, DEFAULT_LANDING_CONFIG } from "@/lib/types/landing";

export function useLandingConfig() {
  const [config, setConfig] = useState<LandingConfig>(DEFAULT_LANDING_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = doc(db, "landing_config", "content");
    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as Partial<LandingConfig>;
          setConfig({
            hero: { ...DEFAULT_LANDING_CONFIG.hero, ...data.hero },
            stats: { ...DEFAULT_LANDING_CONFIG.stats, ...data.stats },
            phones: { ...DEFAULT_LANDING_CONFIG.phones, ...data.phones },
            sellers: { ...DEFAULT_LANDING_CONFIG.sellers, ...data.sellers },
            buyers: { ...DEFAULT_LANDING_CONFIG.buyers, ...data.buyers },
            banner: { ...DEFAULT_LANDING_CONFIG.banner, ...data.banner },
          });
        }
        setLoading(false);
      },
      () => setLoading(false)
    );
    return () => unsub();
  }, []);

  return { config, loading };
}
