import { Hero } from "@/components/home/Hero";
import { BrandStatement } from "@/components/home/BrandStatement";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { EditorialStory } from "@/components/home/EditorialStory";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { CampaignBanner } from "@/components/home/CampaignBanner";
import { Lookbook } from "@/components/home/Lookbook";
import { Newsletter } from "@/components/home/Newsletter";
import { SocialGrid } from "@/components/home/SocialGrid";

export default function Home() {
  return (
    <>
      <section>
        <Hero />
      </section>
      <section>
        <BrandStatement />
      </section>
      <section>
        <FeaturedProducts />
      </section>
      <section>
        <EditorialStory />
      </section>
      <section>
        <CategoryGrid />
      </section>
      <section>
        <CampaignBanner />
      </section>
      <section>
        <Lookbook />
      </section>
      <section>
        <Newsletter />
      </section>
      <section>
        <SocialGrid />
      </section>
    </>
  );
}
