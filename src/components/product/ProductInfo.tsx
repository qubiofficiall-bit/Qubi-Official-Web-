"use client";

import { useState } from "react";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { Accordion } from "@/components/ui/Accordion";
import { AddToCart } from "@/components/product/AddToCart";
import type { Product } from "@/types";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.slug ?? ""
  );
  const [selectedSize, setSelectedSize] = useState("");

  const accordionItems = [
    {
      title: "Aciklama",
      content: (
        <p className="text-sm leading-relaxed">{product.description}</p>
      ),
    },
    {
      title: "Detaylar",
      content: (
        <ul className="text-sm space-y-1">
          {product.details.map((d, i) => (
            <li key={i}>- {d}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Bakim Talimatlari",
      content: (
        <ul className="text-sm space-y-1">
          {product.care.map((c, i) => (
            <li key={i}>- {c}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Kargo ve Iade",
      content: (
        <div className="text-sm space-y-2">
          <p>3000 TL uzeri siparislerde ucretsiz kargo.</p>
          <p>14 gun icinde ucretsiz iade.</p>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Brand */}
      <Link
        href={`/kategori/${product.category}`}
        className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-muted-fg)] font-[family-name:var(--font-body)] hover:text-[var(--color-fg)] transition-colors"
      >
        {product.brand}
      </Link>

      {/* Name */}
      <h1 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-light leading-snug -mt-3">
        {product.name}
      </h1>

      {/* Price */}
      <div className="text-lg font-[family-name:var(--font-body)] flex items-center gap-3">
        {product.compareAtPrice ? (
          <>
            <span className="text-[var(--color-error)]">
              {formatPrice(product.price)}
            </span>
            <span className="line-through text-[var(--color-muted-fg)] text-base">
              {formatPrice(product.compareAtPrice)}
            </span>
          </>
        ) : (
          <span>{formatPrice(product.price)}</span>
        )}
      </div>

      {/* Divider */}
      <hr className="border-[var(--color-border)]" />

      {/* Color selector */}
      {product.colors.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-body)] mb-3">
            Renk:{" "}
            <span className="normal-case tracking-normal text-[var(--color-muted-fg)]">
              {product.colors.find((c) => c.slug === selectedColor)?.name}
            </span>
          </p>
          <div className="flex gap-3">
            {product.colors.map((color) => (
              <button
                key={color.slug}
                type="button"
                onClick={() => setSelectedColor(color.slug)}
                className={cn(
                  "w-7 h-7 rounded-full cursor-pointer transition-shadow",
                  selectedColor === color.slug
                    ? "ring-2 ring-offset-2 ring-[var(--color-fg)]"
                    : "ring-1 ring-[var(--color-border)]"
                )}
                style={{ backgroundColor: color.hex }}
                aria-label={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size selector */}
      {product.sizes.length > 0 && product.sizes[0] !== "Tek Beden" && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-body)]">
              Beden
            </p>
            <Link
              href="/beden-rehberi"
              className="text-[10px] uppercase tracking-[0.1em] font-[family-name:var(--font-body)] text-[var(--color-muted-fg)] hover:text-[var(--color-fg)] transition-colors underline underline-offset-2"
            >
              Beden Rehberi
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "min-w-[48px] px-3 py-2 border text-xs uppercase tracking-[0.05em] font-[family-name:var(--font-body)] transition-colors cursor-pointer",
                  selectedSize === size
                    ? "bg-[var(--color-fg)] text-white border-[var(--color-fg)]"
                    : "border-[var(--color-border)] text-[var(--color-fg)] hover:border-[var(--color-fg)]"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Add to Cart */}
      <AddToCart
        product={product}
        selectedSize={
          product.sizes[0] === "Tek Beden" ? "Tek Beden" : selectedSize
        }
        selectedColor={selectedColor}
      />

      {/* Accordion */}
      <div className="mt-4">
        <Accordion items={accordionItems} defaultOpen={0} />
      </div>
    </div>
  );
}
