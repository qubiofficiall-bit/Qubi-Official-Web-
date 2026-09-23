import Link from "next/link";
import Image from "next/image";
import { homepage } from "@/data/homepage";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

export function EditorialStory() {
  const { editorialStory } = homepage;

  return (
    <section className="py-16 md:py-24">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-7 overflow-hidden">
            <div className="relative aspect-[3/4]">
              <Image
                src={editorialStory.image}
                alt={editorialStory.heading}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </div>

          {/* Text */}
          <div className="lg:col-span-5 flex flex-col justify-center py-8 lg:py-16 lg:pl-8">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted-fg)] font-[family-name:var(--font-body)]">
              {editorialStory.eyebrow}
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-light mt-4 leading-snug">
              {editorialStory.heading}
            </h2>
            <p className="text-[var(--color-muted-fg)] mt-6 text-base leading-relaxed font-[family-name:var(--font-body)]">
              {editorialStory.body}
            </p>
            <Link
              href={editorialStory.ctaHref}
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] font-[family-name:var(--font-body)] text-[var(--color-fg)] hover:text-[var(--color-muted-fg)] transition-colors group"
            >
              <span>{editorialStory.cta}</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
