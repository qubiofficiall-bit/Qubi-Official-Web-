import Link from "next/link";
import { getImageProps } from "next/image";
import { homepage } from "@/data/homepage";
import { buttonVariants } from "@/components/ui/Button";

const MOBILE_IMAGE = "/images/hero/hero-01-mobile.svg";

export function Hero() {
  const { hero } = homepage;

  // Art direction: portrait image on phones, landscape on larger screens.
  const common = { alt: "", sizes: "100vw", fetchPriority: "high" as const };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, src: hero.image, width: 1600, height: 900 });
  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({ ...common, src: MOBILE_IMAGE, width: 800, height: 1200 });

  return (
    <section className="relative min-h-[70vh] md:min-h-[85vh] overflow-hidden flex flex-col">
      {/* Background (LCP) */}
      <picture>
        <source media="(min-width: 768px)" srcSet={desktopSrcSet ?? hero.image} />
        <source srcSet={mobileSrcSet ?? MOBILE_IMAGE} />
        {/* eslint-disable-next-line jsx-a11y/alt-text -- alt="" is set via imgProps (decorative) */}
        <img
          {...imgProps}
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </picture>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />
      {/* Bottom gradient for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Content */}
      <div className="animate-hero-in relative z-10 flex flex-1 flex-col justify-end px-6 pb-16 pt-32 sm:px-10 md:px-16 lg:px-20 lg:pb-24">
        <p className="text-xs tracking-[0.2em] uppercase text-white/90 font-[family-name:var(--font-body)]">
          {hero.eyebrow}
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-4xl min-[400px]:text-5xl md:text-7xl lg:text-8xl text-white font-light mt-3 leading-[0.95] break-words">
          {hero.title}
        </h1>
        <p className="text-white/90 text-lg max-w-md mt-4 font-[family-name:var(--font-body)]">
          {hero.description}
        </p>
        <div className="mt-8">
          <Link
            href={hero.ctaHref}
            className={buttonVariants({
              variant: "secondary",
              className:
                "border-white text-white hover:bg-white hover:text-[var(--color-fg)]",
            })}
          >
            {hero.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
