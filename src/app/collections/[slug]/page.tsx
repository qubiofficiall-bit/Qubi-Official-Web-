import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections } from "@/data/collections";
import {
  getCollectionBySlug,
  getProductsForCollection,
} from "@/lib/products";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { CollectionSort } from "./CollectionSort";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Koleksiyon Bulunamadi | Qubi Official" };
  return {
    title: `Koleksiyon: ${collection.name} | Qubi Official`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: PageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) notFound();

  const products = getProductsForCollection(slug);

  return (
    <div className="pt-[calc(var(--header-height)+var(--announcement-height))]">
      {/* Banner */}
      <div className="bg-[var(--color-muted)] py-16 md:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-light">
              {collection.name}
            </h1>
            <p className="mt-4 text-[var(--color-muted-fg)] text-base font-[family-name:var(--font-body)]">
              {collection.description}
            </p>
          </div>
        </Container>
      </div>

      {/* Products */}
      <Container>
        <div className="py-10 md:py-16">
          {/* Controls */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-xs text-[var(--color-muted-fg)] font-[family-name:var(--font-body)]">
              {products.length} Urun
            </span>
            <CollectionSort />
          </div>

          <ProductGrid products={products} columns={4} />
        </div>
      </Container>
    </div>
  );
}
