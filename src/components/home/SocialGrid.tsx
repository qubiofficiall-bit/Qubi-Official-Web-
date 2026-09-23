import Image from "next/image";
import { homepage } from "@/data/homepage";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

export function SocialGrid() {
  const instagramLink =
    siteConfig.social.find((s) => s.label === "Instagram")?.href ?? "#";

  return (
    <section className="py-16 md:py-24">
      <Container size="wide">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-light tracking-[0.05em]">
            {homepage.social.handle}
          </h2>
          <p className="mt-2 text-sm text-[var(--color-muted-fg)] font-[family-name:var(--font-body)]">
            Qubi dunyasini takip edin.
          </p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {homepage.social.images.map((img, i) => (
            <a
              key={i}
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden bg-[var(--color-muted)]"
            >
              <Image
                src={img}
                alt={`Qubi Official Instagram ${i + 1}`}
                fill
                className="object-cover transition-opacity duration-300 group-hover:opacity-80"
                sizes="(max-width: 768px) 33vw, 16vw"
              />
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
