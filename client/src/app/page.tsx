import Hero from "@/components/home/Hero";
import FeaturedPortfolio from "@/components/home/FeaturedPortfolio";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import {
  TrustStrip,
  CategoryServices,
  CommercialSection,
  EventsSection,
  EditingSection,
  PromotionsSection,
} from "@/components/home/HomeSections";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryServices />
      <FeaturedPortfolio />
      <CommercialSection />
      <EventsSection />
      <EditingSection />
      <PromotionsSection />
      <Testimonials />
      <CTA />
    </>
  );
}