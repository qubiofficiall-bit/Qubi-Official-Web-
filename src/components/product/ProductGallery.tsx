"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";

interface ProductGalleryProps {
  images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedIndex(0);
    if (mobileScrollRef.current) {
      mobileScrollRef.current.scrollTo({ left: 0 });
    }
  }, [images]);

  if (images.length === 0) return null;

  function goTo(index: number) {
    const clamped = Math.max(0, Math.min(images.length - 1, index));
    setSelectedIndex(clamped);
  }

  return (
    <div>
      {/* Desktop: thumbnails + main with arrows */}
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

        {/* Main image with arrows */}
        <div className="relative group aspect-[3/4] overflow-hidden bg-[var(--color-muted)]">
          <Image
            src={images[selectedIndex].src}
            alt={images[selectedIndex].alt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => goTo(selectedIndex - 1)}
                className={cn(
                  "absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white transition-all cursor-pointer",
                  "opacity-0 group-hover:opacity-100",
                  selectedIndex === 0 && "hidden"
                )}
                aria-label="Önceki görsel"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => goTo(selectedIndex + 1)}
                className={cn(
                  "absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white transition-all cursor-pointer",
                  "opacity-0 group-hover:opacity-100",
                  selectedIndex === images.length - 1 && "hidden"
                )}
                aria-label="Sonraki görsel"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile: horizontal scroll with snap + arrows */}
      <div className="lg:hidden relative">
        <div
          ref={mobileScrollRef}
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
                onClick={() => {
                  setSelectedIndex(i);
                  mobileScrollRef.current?.scrollTo({
                    left: i * mobileScrollRef.current.clientWidth,
                    behavior: "smooth",
                  });
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors cursor-pointer",
                  i === selectedIndex
                    ? "bg-[var(--color-fg)]"
                    : "bg-[var(--color-border)]"
                )}
                aria-label={`Görsel ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
