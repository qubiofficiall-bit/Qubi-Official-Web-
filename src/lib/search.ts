import { products } from "@/data/products";
import type { Product } from "@/types";

function normalize(text: string): string {
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/İ/g, "i")
    .replace(/I/g, "ı")
    .normalize("NFC");
}

interface ScoredProduct {
  product: Product;
  score: number;
}

export function searchProducts(query: string): Product[] {
  const normalizedQuery = normalize(query.trim());

  if (!normalizedQuery) return [];

  const terms = normalizedQuery.split(/\s+/);

  const scored: ScoredProduct[] = products
    .map((product) => {
      let score = 0;

      const name = normalize(product.name);
      const category = normalize(product.category);
      const subcategory = normalize(product.subcategory);
      const description = normalize(product.description);
      const tags = product.tags.map(normalize);

      for (const term of terms) {
        if (name.includes(term)) {
          score += 10;
          if (name.startsWith(term)) score += 5;
        }

        if (category.includes(term)) score += 6;
        if (subcategory.includes(term)) score += 5;

        for (const tag of tags) {
          if (tag.includes(term)) score += 4;
        }

        if (description.includes(term)) score += 2;
      }

      return { product, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map((entry) => entry.product);
}
