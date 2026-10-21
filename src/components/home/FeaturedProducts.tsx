"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/product/ProductCard";

export function FeaturedProducts() {
  const products = getAllProducts();
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstElementChild?.clientWidth ?? 300;
    const gap = 24;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -(cardWidth + gap) : cardWidth + gap,
      behavior: "smooth",
    });
  }

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.15em]">
            YENİ GELENLER
          </h2>
          <div className="flex items-center gap-4">
            <Link
              href="/koleksiyon/giyim"
              className="text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-body)] text-[var(--color-muted-fg)] hover:text-[var(--color-fg)] transition-colors underline underline-offset-4"
            >
              Tümünü Gör
            </Link>
            <div className="hidden md:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                className="p-1.5 border border-[var(--color-border)] hover:border-[var(--color-fg)] transition-colors cursor-pointer"
                aria-label="Önceki"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                className="p-1.5 border border-[var(--color-border)] hover:border-[var(--color-fg)] transition-colors cursor-pointer"
                aria-label="Sonraki"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </Container>
      <div className="pl-6 sm:pl-10 md:pl-[max(calc((100vw-1200px)/2+24px),40px)]">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pr-6"
        >
          {products.map((product, i) => (
            <div
              key={product.id}
              className="w-[calc(50%-12px)] md:w-[calc(25%-18px)] flex-shrink-0 snap-start"
            >
              <ProductCard product={product} priority={i < 4} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
