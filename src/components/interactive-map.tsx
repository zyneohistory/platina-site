"use client";

import { MapPin } from "@/components/map-pin";
import { COLLECTIBLE_STATUS, type CollectibleStatusKey } from "@/lib/grades";

export type MapPinData = {
  id: string;
  name: string;
  typeName: string;
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
  const completed = pins.filter((p) => p.status === "completed").length;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
          {regionName}
        </h2>
        <div className="flex items-center gap-4 text-xs">
          <span className="font-medium text-teal">
            {completed}/{pins.length} confirmados
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

      <div className="relative overflow-hidden rounded-xl border border-border bg-surface">
        <div className="relative w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={`Mapa de ${regionName}`}
            className="block w-full select-none"
            draggable={false}
          />
          {pins.map((pin) => (
            <MapPin
              key={pin.id}
              collectibleId={pin.id}
              gameSlug={gameSlug}
              name={pin.name}
              typeName={pin.typeName}
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
