"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ProductImage[];
}

// Same `sizes` for the desktop main image and the first mobile slide, so the
// browser resolves both to the same file and downloads it only once.
const MAIN_SIZES = "(max-width: 1024px) 100vw, 55vw";

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  if (images.length === 0) return null;

  function goToSlide(i: number) {
    setSelectedIndex(i);
    const track = trackRef.current;
    if (track) track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== selectedIndex) setSelectedIndex(i);
  }

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
              aria-label={`Görsel ${i + 1}: ${img.alt}`}
              aria-pressed={selectedIndex === i}
              className={cn(
                "relative aspect-[3/4] w-[60px] overflow-hidden cursor-pointer border transition-colors",
                selectedIndex === i
                  ? "border-[var(--color-fg)]"
                  : "border-transparent hover:border-[var(--color-border)]"
              )}
            >
              <Image
                src={img.src}
                alt=""
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
            loading="eager"
            fetchPriority="high"
            className="object-cover"
            sizes={MAIN_SIZES}
          />
        </div>
      </div>

      {/* Mobile: horizontal scroll with snap */}
      <div className="lg:hidden">
        <div
          ref={trackRef}
          onScroll={handleScroll}
          role="region"
          aria-label="Ürün görselleri"
          tabIndex={0}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-0"
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="w-full flex-shrink-0 snap-center relative aspect-[3/4] bg-[var(--color-muted)]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : undefined}
                className="object-cover"
                sizes={i === 0 ? MAIN_SIZES : "100vw"}
              />
            </div>
          ))}
        </div>
        {/* Dot indicators */}
        {images.length > 1 && (
          <div className="flex justify-center mt-2 -mb-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goToSlide(i)}
                className="-mx-1 p-2 cursor-pointer"
                aria-label={`Görsel ${i + 1}`}
                aria-current={i === selectedIndex ? "true" : undefined}
              >
                <span
                  className={cn(
                    "block w-2 h-2 rounded-full transition-colors",
                    i === selectedIndex
                      ? "bg-[var(--color-fg)]"
                      : "bg-[var(--color-border)]"
                  )}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
