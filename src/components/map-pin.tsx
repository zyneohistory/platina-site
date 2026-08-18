"use client";

import { useState, useTransition } from "react";
import { cycleCollectibleStatus } from "@/lib/actions/collectibles";
import { RavenIcon } from "@/components/raven-icon";
import {
  COLLECTIBLE_STATUS,
  NEXT_COLLECTIBLE_STATUS,
  type CollectibleStatusKey,
} from "@/lib/grades";

export function MapPin({
  collectibleId,
  gameSlug,
  name,
  typeName,
  x,
  y,
  status,
}: {
  collectibleId: string;
  gameSlug: string;
  name: string;
  typeName: string;
  x: number;
  y: number;
  status: CollectibleStatusKey;
}) {
  const [isPending, startTransition] = useTransition();
  const [hovered, setHovered] = useState(false);
  const style = COLLECTIBLE_STATUS[status];
  const next = NEXT_COLLECTIBLE_STATUS[status];

  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-full"
      style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
    >
      {hovered && (
        <div className="absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs whitespace-nowrap shadow-lg">
          <p className="font-medium text-foreground">{name}</p>
          <p className="text-muted">
            {typeName} · {style.label}
          </p>
        </div>
      )}
      <button
        type="button"
        disabled={isPending}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() =>
          startTransition(() =>
            cycleCollectibleStatus(collectibleId, gameSlug, next),
          )
        }
        aria-label={`${name} — ${style.label}`}
        className="flex h-7 w-7 items-center justify-center rounded-full border-2 bg-surface/90 backdrop-blur-sm transition hover:scale-125 disabled:opacity-50"
        style={{
          borderColor: style.color,
          boxShadow: `0 0 8px ${style.color}aa`,
        }}
      >
        <RavenIcon
          color={style.color}
          filled={status === "completed"}
          className="h-4 w-4"
        />
      </button>
    </div>
  );
}
