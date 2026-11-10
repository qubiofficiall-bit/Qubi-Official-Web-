"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { useWishlist } from "@/context/WishlistContext";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  showBadge?: boolean;
  /** Load the primary image eagerly (use for cards visible on first paint). */
  eager?: boolean;
}

const CARD_SIZES = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

export function ProductCard({
  product,
  showBadge = true,
  eager = false,
}: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const hasSecondImage = product.images.length >= 2;

  return (
    <div className="group">
      <div className="relative">
        <Link
          href={`/products/${product.slug}`}
          className="block relative aspect-[3/4] overflow-hidden bg-[var(--color-muted)]"
        >
          {/* Primary image */}
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            fill
            loading={eager ? "eager" : "lazy"}
            className="object-cover transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-105"
            sizes={CARD_SIZES}
          />

          {/* Second image on hover (decorative duplicate) */}
          {hasSecondImage && (
            <Image
              src={product.images[1].src}
              alt=""
              fill
              className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              sizes={CARD_SIZES}
            />
          )}

          {/* Badge */}
          {showBadge && product.isNew && (
            <span className="absolute top-3 left-3 bg-[var(--color-fg)] text-white text-[10px] px-2 py-1 uppercase tracking-widest font-[family-name:var(--font-body)]">
              Yeni
            </span>
          )}
        </Link>

        {/* Wishlist heart — sibling of the link (a button can't live inside a link) */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={cn(
            "absolute top-1.5 right-1.5 p-3 transition-opacity duration-300 cursor-pointer",
            "opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100"
          )}
          aria-label={
            wishlisted
              ? `${product.name} favorilerden çıkar`
              : `${product.name} favorilere ekle`
          }
          aria-pressed={wishlisted}
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]",
              wishlisted
                ? "fill-[var(--color-fg)] text-[var(--color-fg)]"
                : "text-white fill-transparent"
            )}
          />
        </button>
      </div>

      {/* Info */}
      <div className="mt-3">
        <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-muted-fg)] font-[family-name:var(--font-body)]">
          {product.brand}
        </p>
        <Link
          href={`/products/${product.slug}`}
          tabIndex={-1}
          className="block text-sm mt-1 font-[family-name:var(--font-body)] text-[var(--color-fg)]"
        >
          {product.name}
        </Link>
        <div className="text-sm mt-1 font-[family-name:var(--font-body)] flex items-center gap-2">
          {product.compareAtPrice ? (
            <>
              <span className="text-[var(--color-error)]">
                <span className="sr-only">İndirimli fiyat: </span>
                {formatPrice(product.price)}
              </span>
              <span className="line-through text-[var(--color-muted-fg)]">
                <span className="sr-only">Eski fiyat: </span>
                {formatPrice(product.compareAtPrice)}
              </span>
            </>
          ) : (
            <span>{formatPrice(product.price)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
