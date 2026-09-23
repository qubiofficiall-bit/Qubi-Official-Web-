"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { getAllProducts } from "@/lib/products";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";

export default function WishlistPage() {
  const { wishlistIds } = useWishlist();
  const allProducts = getAllProducts();
  const wishlistProducts = allProducts.filter((p) =>
    wishlistIds.includes(p.id)
  );

  return (
    <div className="pt-[calc(var(--header-height)+var(--announcement-height))]">
      <Container>
        <div className="py-12 md:py-20">
          <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-light text-center">
            FAVORILERIM
          </h1>
          <p className="mt-2 text-center text-sm text-[var(--color-muted-fg)] font-[family-name:var(--font-body)]">
            {wishlistProducts.length} urun
          </p>

          {wishlistProducts.length > 0 ? (
            <div className="mt-12">
              <ProductGrid products={wishlistProducts} columns={4} />
            </div>
          ) : (
            <div className="mt-16 text-center">
              <p className="text-[var(--color-muted-fg)] font-[family-name:var(--font-body)]">
                Favori listeniz bos
              </p>
              <Link
                href="/koleksiyon/yeni-gelenler"
                className="mt-6 inline-block text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-body)] underline underline-offset-4 text-[var(--color-fg)] hover:text-[var(--color-muted-fg)] transition-colors"
              >
                Koleksiyonlari Kesfedin
              </Link>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
