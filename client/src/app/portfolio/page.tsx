import PageHeader from "@/components/ui/PageHeader";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        label="Portfolio"
        title="Our Work"
        description="Watch some of the videos we edited for creators and brands."
      />

      <section className="py-20">
        <div className="container-x">
          <PortfolioGrid />
        </div>
      </section>
    </>
  );
}