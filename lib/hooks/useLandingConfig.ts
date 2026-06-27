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
          const d = snap.data() as Partial<LandingConfig>;
          setConfig({
            hero: { ...DEFAULT_LANDING_CONFIG.hero, ...d.hero },
            stats: { ...DEFAULT_LANDING_CONFIG.stats, ...d.stats },
            phones: { ...DEFAULT_LANDING_CONFIG.phones, ...d.phones },
            sellers: { ...DEFAULT_LANDING_CONFIG.sellers, ...d.sellers },
            buyers: { ...DEFAULT_LANDING_CONFIG.buyers, ...d.buyers },
            banner: { ...DEFAULT_LANDING_CONFIG.banner, ...d.banner },
            versions: d.versions ?? DEFAULT_LANDING_CONFIG.versions,
            features: d.features ?? DEFAULT_LANDING_CONFIG.features,
            whyChoose: {
              title: d.whyChoose?.title ?? DEFAULT_LANDING_CONFIG.whyChoose.title,
              reasons: d.whyChoose?.reasons ?? DEFAULT_LANDING_CONFIG.whyChoose.reasons,
            },
            navbar: { ...DEFAULT_LANDING_CONFIG.navbar, ...d.navbar },
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
