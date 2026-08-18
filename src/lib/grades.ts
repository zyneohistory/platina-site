export const TROPHY_GRADES = {
  bronze: { label: "Bronze", color: "#cd7f5a" },
  silver: { label: "Prata", color: "#b6c0c9" },
  gold: { label: "Ouro", color: "#e8c468" },
  platinum: { label: "Platina", color: "#d7e3ec" },
} as const;

export type TrophyGradeKey = keyof typeof TROPHY_GRADES;

export function rarityTier(percent: number): { label: string; color: string } {
  if (percent < 5) return { label: "Ultra raro", color: "#c9518f" };
  if (percent < 15) return { label: "Muito raro", color: "#b5432c" };
  if (percent < 30) return { label: "Raro", color: "#d99a3d" };
  if (percent < 50) return { label: "Incomum", color: "#4fada3" };
  return { label: "Comum", color: "#9c8f7c" };
}

export const COLLECTIBLE_STATUS = {
  completed: { label: "Confirmado", color: "#34d399" },
  unconfirmed: { label: "Incerto", color: "#f2b84b" },
  missing: { label: "Faltando", color: "#4b5563" },
} as const;

export type CollectibleStatusKey = keyof typeof COLLECTIBLE_STATUS;

export const NEXT_COLLECTIBLE_STATUS: Record<CollectibleStatusKey, CollectibleStatusKey> = {
  missing: "unconfirmed",
  unconfirmed: "completed",
  completed: "missing",
};
