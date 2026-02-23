const techToneMap: Array<{ matcher: RegExp; tone: string }> = [
  {
    matcher: /spring|spring boot/i,
    tone: 'border-emerald-400/45 bg-emerald-500/15 text-emerald-700 dark:border-emerald-400/50 dark:bg-emerald-500/20 dark:text-emerald-200',
  },
  {
    matcher: /react|next\.?js|vite/i,
    tone: 'border-sky-400/45 bg-sky-500/15 text-sky-700 dark:border-sky-400/50 dark:bg-sky-500/20 dark:text-sky-200',
  },
  {
    matcher: /typescript|ts/i,
    tone: 'border-blue-400/45 bg-blue-500/15 text-blue-700 dark:border-blue-400/50 dark:bg-blue-500/20 dark:text-blue-200',
  },
  {
    matcher: /javascript|js/i,
    tone: 'border-amber-400/45 bg-amber-500/15 text-amber-700 dark:border-amber-400/50 dark:bg-amber-500/20 dark:text-amber-200',
  },
  {
    matcher: /node\.?js|node/i,
    tone: 'border-lime-400/45 bg-lime-500/15 text-lime-700 dark:border-lime-400/50 dark:bg-lime-500/20 dark:text-lime-200',
  },
  {
    matcher: /tailwind/i,
    tone: 'border-cyan-400/45 bg-cyan-500/15 text-cyan-700 dark:border-cyan-400/50 dark:bg-cyan-500/20 dark:text-cyan-200',
  },
  {
    matcher: /storybook/i,
    tone: 'border-pink-400/45 bg-pink-500/15 text-pink-700 dark:border-pink-400/50 dark:bg-pink-500/20 dark:text-pink-200',
  },
  {
    matcher: /tanstack query|react query/i,
    tone: 'border-orange-400/45 bg-orange-500/15 text-orange-700 dark:border-orange-400/50 dark:bg-orange-500/20 dark:text-orange-200',
  },
  {
    matcher: /zustand/i,
    tone: 'border-violet-400/45 bg-violet-500/15 text-violet-700 dark:border-violet-400/50 dark:bg-violet-500/20 dark:text-violet-200',
  },
  {
    matcher: /zod/i,
    tone: 'border-indigo-400/45 bg-indigo-500/15 text-indigo-700 dark:border-indigo-400/50 dark:bg-indigo-500/20 dark:text-indigo-200',
  },
  {
    matcher: /chart\.?js/i,
    tone: 'border-rose-400/45 bg-rose-500/15 text-rose-700 dark:border-rose-400/50 dark:bg-rose-500/20 dark:text-rose-200',
  },
  {
    matcher: /vitest|testing library/i,
    tone: 'border-teal-400/45 bg-teal-500/15 text-teal-700 dark:border-teal-400/50 dark:bg-teal-500/20 dark:text-teal-200',
  },
  {
    matcher: /eslint/i,
    tone: 'border-purple-400/45 bg-purple-500/15 text-purple-700 dark:border-purple-400/50 dark:bg-purple-500/20 dark:text-purple-200',
  },
  {
    matcher: /prettier/i,
    tone: 'border-fuchsia-400/45 bg-fuchsia-500/15 text-fuchsia-700 dark:border-fuchsia-400/50 dark:bg-fuchsia-500/20 dark:text-fuchsia-200',
  },
  {
    matcher: /figma/i,
    tone: 'border-rose-400/45 bg-rose-500/15 text-rose-700 dark:border-rose-400/50 dark:bg-rose-500/20 dark:text-rose-200',
  },
  {
    matcher: /github actions|github/i,
    tone: 'border-slate-400/45 bg-slate-500/15 text-slate-700 dark:border-slate-400/50 dark:bg-slate-500/20 dark:text-slate-200',
  },
  {
    matcher: /notion/i,
    tone: 'border-zinc-400/45 bg-zinc-500/15 text-zinc-700 dark:border-zinc-400/50 dark:bg-zinc-500/20 dark:text-zinc-200',
  },
];

export function getTechBadgeTone(tech: string): string {
  const matched = techToneMap.find(({ matcher }) => matcher.test(tech));
  return (
    matched?.tone ??
    'border-slate-400/45 bg-slate-500/15 text-slate-700 dark:border-slate-400/50 dark:bg-slate-500/20 dark:text-slate-200'
  );
}
