import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";

export function FeaturedProducts() {
  const products = getFeaturedProducts().slice(0, 4);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.15em]">
            {"ONE CIKAN PARCALAR"}
          </h2>
          <Link
            href="/koleksiyon/yeni-gelenler"
            className="text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-body)] text-[var(--color-muted-fg)] hover:text-[var(--color-fg)] transition-colors underline underline-offset-4"
          >
            {"Tumunu Gor"}
          </Link>
        </div>
        <ProductGrid products={products} columns={4} />
      </Container>
    </section>
  );
}
