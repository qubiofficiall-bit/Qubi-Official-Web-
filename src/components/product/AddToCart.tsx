"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/Button";
import type { Product } from "@/types";

interface AddToCartProps {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  onSizeRequired?: () => void;
}

export function AddToCart({
  product,
  selectedSize,
  selectedColor,
  onSizeRequired,
}: AddToCartProps) {
  const { addToCart, dispatch } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [added, setAdded] = useState(false);
  const wishlisted = isInWishlist(product.id);

  const color =
    product.colors.find((c) => c.slug === selectedColor) ?? product.colors[0];

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2000);
    return () => clearTimeout(t);
  }, [added]);

  function handleAdd() {
    if (!selectedSize) {
      onSizeRequired?.();
      return;
    }
    addToCart(product, selectedSize, color);
    dispatch({ type: "OPEN_CART" });
    setAdded(true);
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleAdd}
        variant="primary"
        size="lg"
        className="w-full"
        disabled={added}
      >
        {added
          ? "EKLENDI ✓"
          : selectedSize
            ? "SEPETE EKLE"
            : "BEDEN SECINIZ"}
      </Button>
      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        className={cn(
          "flex w-full items-center justify-center gap-2 py-3 text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-body)] transition-colors cursor-pointer",
          wishlisted
            ? "text-[var(--color-fg)]"
            : "text-[var(--color-muted-fg)] hover:text-[var(--color-fg)]"
        )}
      >
        <Heart
          className={cn(
            "h-4 w-4",
            wishlisted && "fill-[var(--color-fg)]"
          )}
        />
        <span>
          {wishlisted ? "FAVORILERDE ✓" : "FAVORILERE EKLE"}
        </span>
      </button>
    </div>
  );
}
