interface SectionTitleProps {
  title: string;
  description: string;
}

export function SectionTitle({ title, description }: SectionTitleProps): JSX.Element {
  return (
    <div className="mb-8 fade-up md:mb-10">
      <h2 className="text-2xl font-bold text-text md:text-4xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">{description}</p>
    </div>
  );
}
