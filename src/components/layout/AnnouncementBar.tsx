"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { siteConfig } from "@/config/site";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className="relative flex items-center justify-center bg-[var(--color-fg)] text-white text-xs text-center py-2 tracking-[0.05em] uppercase font-[family-name:var(--font-body)]"
      style={{ height: "var(--announcement-height)" }}
    >
      <span>{siteConfig.announcement}</span>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors cursor-pointer"
        aria-label="Kapat"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
