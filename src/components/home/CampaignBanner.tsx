import Link from "next/link";
import { homepage } from "@/data/homepage";
import { Button } from "@/components/ui/Button";

export function CampaignBanner() {
  const { campaign } = homepage;

  return (
    <section className="relative h-[60vh] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${campaign.image})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl text-white font-light leading-tight max-w-3xl">
          {campaign.heading}
        </h2>
        <p className="text-white/80 text-base md:text-lg mt-4 max-w-lg font-[family-name:var(--font-body)]">
          {campaign.subheading}
        </p>
        <div className="mt-8">
          <Link href={campaign.ctaHref}>
            <Button
              variant="secondary"
              className="border-white text-white hover:bg-white hover:text-[var(--color-fg)]"
            >
              {campaign.cta}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
