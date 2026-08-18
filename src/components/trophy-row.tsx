"use client";

import { useTransition } from "react";
import { toggleTrophy } from "@/lib/actions/trophies";
import { TROPHY_GRADES, rarityTier, type TrophyGradeKey } from "@/lib/grades";
import { TrophyIcon } from "@/components/trophy-icon";

export function TrophyRow({
  id,
  name,
  description,
  grade,
  isSecret,
  earned,
  gameSlug,
  rarityPercent,
}: {
  id: string;
  name: string;
  description: string;
  grade: TrophyGradeKey;
  isSecret: boolean;
  earned: boolean;
  gameSlug: string;
  rarityPercent: number | null;
}) {
  const [isPending, startTransition] = useTransition();
  const style = TROPHY_GRADES[grade] ?? TROPHY_GRADES.bronze;
  const rarity = rarityPercent !== null ? rarityTier(rarityPercent) : null;

  return (
    <li className="flex items-start gap-4 rounded-xl border border-border bg-surface p-4">
      <button
        type="button"
        disabled={isPending}
        onClick={() =>
          startTransition(() => toggleTrophy(id, gameSlug, !earned))
        }
        aria-pressed={earned}
        title={earned ? "Marcar como pendente" : "Marcar como conquistado"}
        className="relative mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border transition disabled:opacity-50"
        style={{
          background: earned ? `${style.color}14` : "var(--surface-2)",
          borderColor: earned ? style.color : "var(--border)",
          boxShadow: earned ? `0 0 16px ${style.color}55` : "none",
        }}
      >
        <TrophyIcon
          color={style.color}
          filled={earned}
          className="h-7 w-7"
        />
        {earned && (
          <span
            className="absolute -right-1.5 -bottom-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2"
            style={{ background: style.color, borderColor: "var(--surface)" }}
          >
            <svg
              viewBox="0 0 20 20"
              fill="none"
              className="h-3 w-3"
              stroke="#090b0e"
              strokeWidth={3}
            >
              <path
                d="M4 10.5l3.5 3.5L16 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="font-medium">{name}</h3>
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase"
            style={{ color: style.color, background: `${style.color}1a` }}
          >
            {style.label}
          </span>
          {earned && (
            <span className="flex items-center gap-1 rounded-full bg-status-completed/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-status-completed uppercase">
              Conquistado
            </span>
          )}
          {isSecret && (
            <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] tracking-wide text-muted uppercase">
              Segredo
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted">{description}</p>
        {rarity && rarityPercent !== null && (
          <p className="mt-1.5 flex items-center gap-1.5 text-xs">
            <span style={{ color: rarity.color }} className="font-medium">
              {rarity.label}
            </span>
            <span className="text-muted">
              · {rarityPercent.toFixed(1)}% dos jogadores conquistaram
            </span>
          </p>
        )}
      </div>
    </li>
  );
}
