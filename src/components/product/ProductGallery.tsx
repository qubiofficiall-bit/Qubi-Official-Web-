"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div>
      {/* Desktop: thumbnails + main */}
      <div className="hidden lg:grid lg:grid-cols-[60px_1fr] lg:gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedIndex(i)}
              className={cn(
                "relative aspect-[3/4] w-[60px] overflow-hidden cursor-pointer border transition-colors",
                selectedIndex === i
                  ? "border-[var(--color-fg)]"
                  : "border-transparent hover:border-[var(--color-border)]"
              )}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="60px"
              />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-muted)]">
          <Image
            src={images[selectedIndex].src}
            alt={images[selectedIndex].alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>
      </div>

      {/* Mobile: horizontal scroll with snap */}
      <div className="lg:hidden">
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-0">
          {images.map((img, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 snap-center relative aspect-[3/4] bg-[var(--color-muted)]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedIndex(i)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors cursor-pointer",
                  i === selectedIndex
                    ? "bg-[var(--color-fg)]"
                    : "bg-[var(--color-border)]"
                )}
                aria-label={`Gorsel ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
