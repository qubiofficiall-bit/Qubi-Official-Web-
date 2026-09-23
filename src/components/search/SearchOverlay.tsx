"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { searchProducts } from "@/lib/search";
import { useDebounce } from "@/hooks/useDebounce";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import type { Product } from "@/types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const debouncedQuery = useDebounce(query, 300);

  useLockBodyScroll(isOpen);

  useEffect(() => {
    if (debouncedQuery.trim()) {
      setResults(searchProducts(debouncedQuery));
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleKeyDown]);

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  return (
    <div
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
            onClick={onClose}
            className="text-[var(--color-fg)] cursor-pointer"
            aria-label="Kapat"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Search input */}
        <div className="py-8 border-b border-[var(--color-border)]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ne ariyorsunuz?"
            autoFocus={isOpen}
            className="w-full bg-transparent font-[family-name:var(--font-display)] text-2xl md:text-4xl text-[var(--color-fg)] placeholder:text-[var(--color-muted-fg)] outline-none border-none"
          />
        </div>

        {/* Results */}
        <div className="py-10">
          {query.trim() && results.length === 0 && (
            <p className="text-center text-[var(--color-muted-fg)] font-[family-name:var(--font-body)] text-sm">
              Sonuc bulunamadi
            </p>
          )}
          {results.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
              {results.map((product) => (
                <div key={product.id} onClick={onClose}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
