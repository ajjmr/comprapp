"use client";

import { useLandingConfig } from "@/lib/hooks/useLandingConfig";

const COLOR_CLASSES = {
  purple: "bg-purple-600 text-white",
  amber: "bg-amber-400 text-amber-950",
  red: "bg-red-600 text-white",
  green: "bg-green-600 text-white",
};

export default function GlobalBanner() {
  const { config } = useLandingConfig();
  const { active, message, color } = config.banner;

  if (!active || !message) return null;

  return (
    <div className={`w-full py-2.5 px-4 text-center text-sm font-semibold ${COLOR_CLASSES[color]} z-50 relative`}>
      {message}
    </div>
  );
}
