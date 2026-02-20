import type { SkillGroup as SkillGroupModel } from '../../types/portfolio';

interface SkillGroupProps {
  group: SkillGroupModel;
}

export function SkillGroup({ group }: SkillGroupProps): JSX.Element {
  return (
    <article className="glass-card card-lift">
      <h3 className="text-base font-semibold">{group.category}</h3>
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
