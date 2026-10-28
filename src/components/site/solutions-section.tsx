import {
  Activity,
  Cpu,
  Layers,
  Lightbulb,
  LockKeyhole,
  Network,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Waves,
} from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";

const groupIcons = [TrendingUp, Waves];
const itemIcons = [
  [ShieldCheck, Target, Lightbulb],
  [Layers, Sparkles, Network, Cpu, LockKeyhole, Activity],
];

export function SolutionsSection({
  content,
}: Readonly<{ content: Dictionary["solutions"] }>) {
  return (
    <div id="solutions" className="pt-32">
      <div className="text-center">
        <p className="kh-eyebrow text-[#005ea8]">{content.eyebrow}</p>
        <h2 className="mt-5 text-balance text-4xl font-extrabold leading-tight tracking-normal text-[#111827] sm:text-6xl">
          {content.title}
        </h2>
      </div>

      <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-2">
        {content.groups.map((group, groupIndex) => {
          const Icon = groupIcons[groupIndex] ?? Waves;
          return (
            <article key={group.title} className="kh-solution-card">
              <span className="kh-solution-icon">
                <Icon className="h-8 w-8" />
              </span>
              <h3>{group.title}</h3>
              <div className="kh-solution-list">
                {group.items.map((label, itemIndex) => {
                  const ItemIcon = itemIcons[groupIndex]?.[itemIndex] ?? Activity;
                  return (
                    <div key={label} className="kh-solution-item">
                      <ItemIcon className="h-5 w-5" />
                      <span>{label}</span>
                    </div>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
