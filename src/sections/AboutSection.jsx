import { SectionTitle } from '../components/SectionTitle';
import { portfolioData } from '../data/portfolioData';

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-wrap section-space border-t border-slate-300/20 dark:border-slate-700/40"
    >
      <SectionTitle
        title="About"
        description="문제 정의부터 구현, 개선까지 책임지는 개발 문화를 지향합니다."
      />
      <div className="space-y-4">
        {portfolioData.profile.bio.map((line) => (
          <p key={line} className="max-w-3xl text-sm leading-7 text-muted md:text-base">
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}
