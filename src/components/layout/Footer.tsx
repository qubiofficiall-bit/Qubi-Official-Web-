"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-[var(--color-fg)] text-white">
      {/* Main Grid */}
      <Container>
        <div className="grid grid-cols-2 gap-8 py-16 lg:grid-cols-5">
          {/* Logo Column */}
          <div className="col-span-2 lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 text-sm leading-relaxed text-white/60 font-[family-name:var(--font-body)]">
              {siteConfig.description}
            </p>
          </div>

          {/* Link Columns */}
          {siteConfig.footer.columns.map((column) => (
            <div key={column.title}>
              <h3 className="mb-4 text-xs tracking-[0.1em] font-[family-name:var(--font-body)]">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white font-[family-name:var(--font-body)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      {/* Newsletter */}
      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col items-center py-12 text-center">
            <h3 className="font-[family-name:var(--font-display)] text-2xl tracking-[0.1em]">
              {siteConfig.newsletter.heading}
            </h3>
            <p className="mt-2 text-sm text-white/60 font-[family-name:var(--font-body)]">
              {siteConfig.newsletter.subheading}
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex w-full max-w-md"
            >
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 border border-white/20 bg-transparent px-4 py-3 text-xs tracking-[0.05em] text-white placeholder:text-white/40 font-[family-name:var(--font-body)] outline-none transition-colors focus:border-white/60"
              />
              <button
                type="submit"
                className="border border-white bg-white px-6 py-3 text-xs uppercase tracking-[0.1em] text-[var(--color-fg)] font-[family-name:var(--font-body)] transition-colors hover:bg-transparent hover:text-white cursor-pointer"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <p className="text-xs text-white/40 font-[family-name:var(--font-body)]">
              {siteConfig.footer.copyright}
            </p>
            <div className="flex gap-6">
              {siteConfig.social.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="text-xs text-white/60 transition-colors hover:text-white font-[family-name:var(--font-body)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
