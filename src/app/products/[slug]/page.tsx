import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { Container } from "@/components/ui/Container";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
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
  if (!product) return { title: "Urun Bulunamadi | Qubi Official" };
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-8 md:py-12">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <ProductGallery images={product.images} />
          </div>
          {/* Info */}
          <div className="lg:col-span-5">
            <ProductInfo product={product} />
          </div>
        </div>
      </Container>

      {/* Related products */}
      {related.length > 0 && (
        <div className="border-t border-[var(--color-border)]">
          <Container>
            <div className="py-16 md:py-24">
              <h2 className="font-[family-name:var(--font-body)] text-xs uppercase tracking-[0.15em] mb-10 text-center">
                Bunlari da Begenebilirsiniz
              </h2>
              <ProductGrid products={related} columns={4} />
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
