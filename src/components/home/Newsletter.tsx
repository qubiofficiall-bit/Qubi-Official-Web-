"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <section className="bg-[var(--color-muted)] py-20">
      <Container size="narrow">
        <div className="text-center">
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-light tracking-[0.05em]">
            {siteConfig.newsletter.heading}
          </h2>
          <p className="mt-3 text-[var(--color-muted-fg)] text-base font-[family-name:var(--font-body)]">
            {siteConfig.newsletter.subheading}
          </p>

          {submitted ? (
            <p className="mt-10 text-sm font-[family-name:var(--font-body)] text-[var(--color-fg)]">
              {"Tesekkurler! Kayit oldunuz."}
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-end gap-4 sm:gap-0 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                className="flex-1 border-b border-[var(--color-fg)] bg-transparent px-0 py-3 text-sm font-[family-name:var(--font-body)] text-[var(--color-fg)] placeholder:text-[var(--color-muted-fg)] outline-none"
              />
              <button
                type="submit"
                className="sm:ml-6 border-b border-[var(--color-fg)] bg-transparent px-0 py-3 text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-body)] text-[var(--color-fg)] hover:text-[var(--color-muted-fg)] transition-colors cursor-pointer whitespace-nowrap"
              >
                ABONE OL
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
