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
  priority?: boolean;
}

export function ProductCard({
  product,
  showBadge = true,
  priority = false,
}: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const hasSecondImage = product.images.length >= 2;

  return (
    <div className="group">
      <Link
        href={`/products/${product.slug}`}
        className="block relative aspect-[3/4] overflow-hidden bg-[var(--color-muted)]"
      >
        {/* Primary image */}
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Second image on hover */}
        {hasSecondImage && (
          <Image
            src={product.images[1].src}
            alt={product.images[1].alt}
            fill
            className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        )}

        {/* Badge */}
        {showBadge && product.isNew && (
          <span className="absolute top-3 left-3 bg-[var(--color-fg)] text-white text-[10px] px-2 py-1 uppercase tracking-widest font-[family-name:var(--font-body)]">
            Yeni
          </span>
        )}

        {/* Wishlist heart */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={cn(
            "absolute top-3 right-3 p-1.5 transition-opacity duration-300 cursor-pointer",
            "opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
          )}
          aria-label={wishlisted ? "Favorilerden cikar" : "Favorilere ekle"}
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              wishlisted
                ? "fill-[var(--color-fg)] text-[var(--color-fg)]"
                : "text-white fill-transparent"
            )}
          />
        </button>
      </Link>

      {/* Info */}
      <div className="mt-3">
        <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-muted-fg)] font-[family-name:var(--font-body)]">
          {product.brand}
        </p>
        <Link href={`/products/${product.slug}`}>
          <p className="text-sm mt-1 font-[family-name:var(--font-body)] text-[var(--color-fg)]">
            {product.name}
          </p>
        </Link>
        <div className="text-sm mt-1 font-[family-name:var(--font-body)] flex items-center gap-2">
          {product.compareAtPrice ? (
            <>
              <span className="text-[var(--color-error)]">
                {formatPrice(product.price)}
              </span>
              <span className="line-through text-[var(--color-muted-fg)]">
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
