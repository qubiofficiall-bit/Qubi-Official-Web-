import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  /** Number of leading cards whose image loads eagerly (only for above-the-fold grids). */
  eagerCount?: number;
}

const colsClass = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
} as const;

export function ProductGrid({
  products,
  columns = 4,
  eagerCount = 0,
}: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12",
        colsClass[columns]
      )}
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} eager={i < eagerCount} />
      ))}
    </div>
  );
}
