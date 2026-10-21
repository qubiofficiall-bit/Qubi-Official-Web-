"use client";

import { useState, useMemo } from "react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import type { Product } from "@/types";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.slug ?? ""
  );

  const filteredImages = useMemo(() => {
    if (product.colors.length <= 1) return product.images;
    const colorObj = product.colors.find((c) => c.slug === selectedColor);
    if (!colorObj) return product.images;
    const colorName = colorObj.name.toLowerCase();
    const matched = product.images.filter(
      (img) => img.alt.toLowerCase().includes(colorName)
    );
    return matched.length > 0 ? matched : product.images;
  }, [product, selectedColor]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-8 md:py-12">
      <div className="lg:col-span-7">
        <ProductGallery images={filteredImages} />
      </div>
      <div className="lg:col-span-5">
        <ProductInfo
          product={product}
          onColorChange={setSelectedColor}
        />
      </div>
    </div>
  );
}
