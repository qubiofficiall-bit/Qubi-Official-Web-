"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { homepage } from "@/data/homepage";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Hero() {
  const [visible, setVisible] = useState(false);
  const { hero } = homepage;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${hero.image})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div
        className={cn(
          "relative z-10 flex h-full flex-col justify-end px-6 pb-16 sm:px-10 md:px-16 lg:px-20 lg:pb-24 transition-all duration-1000 ease-[var(--ease-editorial)]",
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        )}
      >
        <p className="text-xs tracking-[0.2em] uppercase text-white/80 font-[family-name:var(--font-body)]">
          {hero.eyebrow}
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl text-white font-light mt-3 leading-[0.95]">
          {hero.title}
        </h1>
        <p className="text-white/80 text-lg max-w-md mt-4 font-[family-name:var(--font-body)]">
          {hero.description}
        </p>
        <div className="mt-8">
          <Link href={hero.ctaHref}>
            <Button
              variant="secondary"
              className="border-white text-white hover:bg-white hover:text-[var(--color-fg)]"
            >
              {hero.cta}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
