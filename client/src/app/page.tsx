import Hero from "@/components/home/Hero";
import FeaturedPortfolio from "@/components/home/FeaturedPortfolio";
import CTA from "@/components/home/CTA";
import {
  TrustStrip,
  CategoryServices,
  CommercialSection,
  EventsSection,
  EditingSection,
  PromotionsSection,
} from "@/components/home/HomeSections";
import {
  ProcessSection,
  PackagesSection,
  WhyChoose,
  FAQSection,
} from "@/components/home/InfoSections";

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
      <ProcessSection />
      <PackagesSection />
      <WhyChoose />
      <FAQSection />
      <CTA />
    </>
  );
}