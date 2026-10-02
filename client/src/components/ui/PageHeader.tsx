type PageHeaderProps = {
  label: string;
  title: string;
  description?: string;
};

export default function PageHeader({
  label,
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="border-b border-border py-16 md:py-24">
      <div className="container-x text-center">
        <p className="mb-3 text-sm uppercase tracking-widest text-accent">
          {label}
        </p>
        <h1 className="font-display text-4xl font-bold md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-muted">{description}</p>
        )}
      </div>
    </section>
  );
}