"use client";

import { useMemo, useState, useRef, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchProducts } from "@/lib/search";
import { useDebounce } from "@/hooks/useDebounce";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useDialog } from "@/hooks/useDialog";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import type { Product } from "@/types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 300);
  const results = useMemo<Product[]>(
    () => (debouncedQuery.trim() ? searchProducts(debouncedQuery) : []),
    [debouncedQuery]
  );
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset the query whenever the overlay closes.
  const handleClose = useCallback(() => {
    setQuery("");
    onClose();
  }, [onClose]);

  const dialogRef = useDialog<HTMLDivElement>(isOpen, handleClose, inputRef);

  useLockBodyScroll(isOpen);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Ürün arama"
      inert={!isOpen}
      className={cn(
        "fixed inset-0 bg-[var(--color-bg)] z-[var(--z-modal)] transition-opacity duration-300 overflow-y-auto",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <Container>
        {/* Top bar */}
        <div className="flex items-center justify-end py-6">
          <button
            type="button"
            onClick={handleClose}
            className="-m-2 p-2 text-[var(--color-fg)] cursor-pointer"
            aria-label="Aramayı kapat"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Search input */}
        <div className="py-8 border-b border-[var(--color-border)]">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ne arıyorsunuz?"
            aria-label="Ürün ara"
            className="w-full bg-transparent font-[family-name:var(--font-display)] text-2xl md:text-4xl text-[var(--color-fg)] placeholder:text-[var(--color-muted-fg)] outline-none border-none [&::-webkit-search-cancel-button]:hidden"
          />
        </div>

        {/* Results */}
        <div className="py-10" aria-live="polite">
          {debouncedQuery.trim() && results.length === 0 && (
            <p className="text-center text-[var(--color-muted-fg)] font-[family-name:var(--font-body)] text-sm">
              Sonuç bulunamadı
            </p>
          )}
          {results.length > 0 && (
            <>
              <p className="sr-only">{results.length} ürün bulundu</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
                {results.map((product) => (
                  <div
                    key={product.id}
                    onClick={(e) => {
                      // Close when navigating to a product, not when toggling the wishlist.
                      if ((e.target as HTMLElement).closest("a")) handleClose();
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
