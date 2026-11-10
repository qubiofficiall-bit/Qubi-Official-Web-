import Link from "next/link";
import Image from "next/image";
import { homepage } from "@/data/homepage";
import { buttonVariants } from "@/components/ui/Button";

export function CampaignBanner() {
  const { campaign } = homepage;

  return (
    <section className="relative min-h-[60vh] overflow-hidden flex">
      {/* Background */}
      <Image
        src={campaign.image}
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center px-6 py-16">
        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl text-white font-light leading-tight max-w-3xl">
          {campaign.heading}
        </h2>
        <p className="text-white/90 text-base md:text-lg mt-4 max-w-lg font-[family-name:var(--font-body)]">
          {campaign.subheading}
        </p>
        <div className="mt-8">
          <Link
            href={campaign.ctaHref}
            className={buttonVariants({
              variant: "secondary",
              className:
                "border-white text-white hover:bg-white hover:text-[var(--color-fg)]",
            })}
          >
            {campaign.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
