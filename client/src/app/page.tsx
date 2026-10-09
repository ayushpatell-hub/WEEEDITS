import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import Showreel from "@/components/home/Showreel";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedPortfolio from "@/components/home/FeaturedPortfolio";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Showreel />
      <ServicesPreview />
      <FeaturedPortfolio />
      <Testimonials />
      <CTA />
    </>
  );
}