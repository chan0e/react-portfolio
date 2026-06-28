import type { Profile } from '../types/portfolio';

interface FooterProps {
  profile: Profile;
}

export function Footer({ profile }: FooterProps): JSX.Element {
  return (
    <footer className="section-divider py-8">
      <div className="section-wrap flex flex-col gap-1 text-xs text-muted md:flex-row md:items-center md:justify-between">
        <span>
          {profile.name} · {profile.location}
        </span>
        <span>© {new Date().getFullYear()} All rights reserved.</span>
      </div>
    </footer>
  );
}
