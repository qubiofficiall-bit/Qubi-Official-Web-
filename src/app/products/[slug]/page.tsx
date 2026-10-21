import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { Container } from "@/components/ui/Container";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductGrid } from "@/components/product/ProductGrid";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Ürün Bulunamadı | Qubi Official" };
  return {
    title: `${product.name} | Qubi Official`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  return (
    <div className="pt-[calc(var(--header-height)+var(--announcement-height))]">
      <Container>
        <ProductDetail product={product} />
      </Container>

      {/* Related products */}
      {related.length > 0 && (
        <div className="border-t border-[var(--color-border)]">
          <Container>
            <div className="py-16 md:py-24">
              <h2 className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.15em] mb-10 text-center">
                Bunları da Beğenebilirsiniz
              </h2>
              <ProductGrid products={related} columns={4} />
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
