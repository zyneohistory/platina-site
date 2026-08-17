"use client";

import { useTransition } from "react";
import { cycleCollectibleStatus } from "@/lib/actions/collectibles";
import {
  COLLECTIBLE_STATUS,
  NEXT_COLLECTIBLE_STATUS,
  type CollectibleStatusKey,
} from "@/lib/grades";

export function CollectibleToggle({
  collectibleId,
  gameSlug,
  status,
}: {
  collectibleId: string;
  gameSlug: string;
  status: CollectibleStatusKey;
}) {
  const [isPending, startTransition] = useTransition();
  const style = COLLECTIBLE_STATUS[status];
  const next = NEXT_COLLECTIBLE_STATUS[status];

  return (
    <button
      type="button"
      disabled={isPending}
      onClick={() =>
        startTransition(() =>
          cycleCollectibleStatus(collectibleId, gameSlug, next),
        )
      }
      title="Clique para alternar o status"
      className="flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition disabled:opacity-50"
      style={{ borderColor: style.color, color: style.color }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: style.color }}
      />
      {style.label}
    </button>
  );
}
