"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  // Let the fixed header and page offsets (which read this variable) close the gap.
  useEffect(() => {
    if (!dismissed) return;
    const root = document.documentElement;
    root.style.setProperty("--announcement-height", "0px");
    return () => {
      root.style.removeProperty("--announcement-height");
    };
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Duyuru"
      className="relative flex items-center justify-center bg-[var(--color-fg)] text-white text-[10px] min-[360px]:text-xs text-center px-9 py-2 tracking-normal min-[360px]:tracking-[0.05em] uppercase font-[family-name:var(--font-body)]"
      style={{ height: "var(--announcement-height)" }}
    >
      <p>{siteConfig.announcement}</p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
        aria-label="Duyuruyu kapat"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
