"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const sortOptions = [
  { label: "One Cikan", value: "featured" },
  { label: "En Yeni", value: "newest" },
  { label: "Fiyat (Artan)", value: "price-asc" },
  { label: "Fiyat (Azalan)", value: "price-desc" },
] as const;

export function CollectionSort() {
  const [active, setActive] = useState("featured");

  return (
    <div className="flex items-center gap-4">
      {sortOptions.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setActive(opt.value)}
          className={cn(
            "text-xs font-[family-name:var(--font-body)] transition-colors cursor-pointer hidden sm:inline-block",
            active === opt.value
              ? "text-[var(--color-fg)] underline underline-offset-4"
              : "text-[var(--color-muted-fg)] hover:text-[var(--color-fg)]"
          )}
        >
          {opt.label}
        </button>
      ))}
      {/* Mobile: select */}
      <select
        value={active}
        onChange={(e) => setActive(e.target.value)}
        className="sm:hidden text-xs font-[family-name:var(--font-body)] bg-transparent border border-[var(--color-border)] px-2 py-1 text-[var(--color-fg)] cursor-pointer"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
