export function SkillGroup({ group }) {
  return (
    <article className="rounded-2xl border border-slate-300/40 bg-surface/90 p-5 dark:border-slate-700">
      <h3 className="text-base font-semibold">{group.category}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-slate-300/40 px-3 py-1 text-xs text-muted dark:border-slate-700"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
