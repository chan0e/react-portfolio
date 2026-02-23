import type { SkillGroup as SkillGroupModel } from '../../types/portfolio';

interface SkillGroupProps {
  group: SkillGroupModel;
}

export function SkillGroup({ group }: SkillGroupProps): JSX.Element {
  return (
    <article className="glass-card card-lift p-6 md:p-7">
      <h3 className="text-lg font-semibold tracking-tight text-text">{group.category}</h3>
      <ul className="mt-4 flex flex-wrap gap-2">
        {group.items.map((item) => (
          <li key={item} className="chip">
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
