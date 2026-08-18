"use client";

import { useMemo, useState } from "react";
import { TrophyRow } from "@/components/trophy-row";
import type { TrophyGradeKey } from "@/lib/grades";

type Trophy = {
  id: string;
  name: string;
  description: string;
  grade: TrophyGradeKey;
  isSecret: boolean;
  earned: boolean;
};

type Filter = "all" | "earned" | "missing";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "missing", label: "Pendentes" },
  { key: "earned", label: "Conquistados" },
];

export function TrophyList({
  trophies,
  gameSlug,
}: {
  trophies: Trophy[];
  gameSlug: string;
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return trophies.filter((t) => {
      if (filter === "earned" && !t.earned) return false;
      if (filter === "missing" && t.earned) return false;
      if (query && !t.name.toLowerCase().includes(query.toLowerCase()))
        return false;
      return true;
    });
  }, [trophies, filter, query]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex gap-1 rounded-lg border border-border bg-surface p-1">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                filter === f.key
                  ? "bg-gold text-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar troféu..."
          className="ml-auto min-w-0 flex-1 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-sm outline-none focus:border-gold sm:flex-none sm:basis-64"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
          Nenhum troféu encontrado com esse filtro.
        </p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((trophy) => (
            <TrophyRow
              key={trophy.id}
              id={trophy.id}
              name={trophy.name}
              description={trophy.description}
              grade={trophy.grade}
              isSecret={trophy.isSecret}
              earned={trophy.earned}
              gameSlug={gameSlug}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
