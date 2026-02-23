interface SectionTitleProps {
  title: string;
  description: string;
}

export function SectionTitle({ title, description }: SectionTitleProps): JSX.Element {
  return (
    <div className="mb-10 fade-up md:mb-12">
      <h2 className="text-3xl font-bold text-text md:text-5xl">{title}</h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted md:text-base">
        {description}
      </p>
    </div>
  );
}
