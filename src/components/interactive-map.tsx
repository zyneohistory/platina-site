"use client";

import { useMemo, useState } from "react";
import { MapPin } from "@/components/map-pin";
import { COLLECTIBLE_STATUS, type CollectibleStatusKey } from "@/lib/grades";

export type MapPinData = {
  id: string;
  name: string;
  typeName: string;
  typeSlug: string;
  x: number;
  y: number;
  status: CollectibleStatusKey;
};

export function InteractiveMap({
  imageUrl,
  regionName,
  pins,
  gameSlug,
}: {
  imageUrl: string;
  regionName: string;
  pins: MapPinData[];
  gameSlug: string;
}) {
  const types = useMemo(() => {
    const map = new Map<string, string>();
    for (const p of pins) map.set(p.typeSlug, p.typeName);
    return [...map.entries()];
  }, [pins]);

  const [activeTypes, setActiveTypes] = useState<Set<string>>(
    () => new Set(types.map(([slug]) => slug)),
  );

  const visiblePins = pins.filter((p) => activeTypes.has(p.typeSlug));
  const completed = visiblePins.filter((p) => p.status === "completed").length;

  function toggleType(slug: string) {
    setActiveTypes((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
          {regionName}
        </h2>
        <div className="flex items-center gap-4 text-xs">
          <span className="font-medium text-teal">
            {completed}/{visiblePins.length} confirmados
          </span>
          {(Object.keys(COLLECTIBLE_STATUS) as CollectibleStatusKey[]).map(
            (key) => (
              <span key={key} className="flex items-center gap-1.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: COLLECTIBLE_STATUS[key].color }}
                />
                <span className="text-muted">
                  {COLLECTIBLE_STATUS[key].label}
                </span>
              </span>
            ),
          )}
        </div>
      </div>

      {types.length > 1 && (
        <div className="flex flex-wrap gap-1.5">
          {types.map(([slug, name]) => {
            const active = activeTypes.has(slug);
            return (
              <button
                key={slug}
                type="button"
                onClick={() => toggleType(slug)}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                  active
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {name}
              </button>
            );
          })}
        </div>
      )}

      <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
        <div className="relative w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={`Mapa de ${regionName}`}
            className="block w-full select-none"
            draggable={false}
          />
          {visiblePins.map((pin) => (
            <MapPin
              key={pin.id}
              collectibleId={pin.id}
              gameSlug={gameSlug}
              name={pin.name}
              typeName={pin.typeName}
              typeSlug={pin.typeSlug}
              x={pin.x}
              y={pin.y}
              status={pin.status}
            />
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-muted">
        Clique num pino pra alternar entre faltando → incerto → confirmado.
      </p>
    </div>
  );
}
