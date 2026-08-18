"use client";

import { useMemo, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
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
  imageWidth,
  imageHeight,
  regionName,
  pins,
  gameSlug,
}: {
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
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
        <TransformWrapper
          minScale={1}
          maxScale={6}
          initialScale={1}
          centerOnInit
          doubleClick={{ mode: "toggle" }}
          wheel={{ step: 0.2 }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <div className="absolute top-3 right-3 z-20 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => zoomIn(0.5)}
                  aria-label="Aumentar zoom"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface/90 text-lg leading-none text-foreground backdrop-blur-sm transition hover:border-gold hover:text-gold"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => zoomOut()}
                  aria-label="Diminuir zoom"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface/90 text-lg leading-none text-foreground backdrop-blur-sm transition hover:border-gold hover:text-gold"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => resetTransform()}
                  aria-label="Restaurar zoom"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface/90 text-xs leading-none text-foreground backdrop-blur-sm transition hover:border-gold hover:text-gold"
                >
                  ⤢
                </button>
              </div>
              <TransformComponent
                wrapperStyle={{
                  width: "100%",
                  aspectRatio: `${imageWidth} / ${imageHeight}`,
                }}
                contentStyle={{ width: "100%", height: "100%" }}
              >
                <div className="relative h-full w-full">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageUrl}
                    alt={`Mapa de ${regionName}`}
                    className="block h-full w-full select-none"
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
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      </div>

      <p className="text-center text-xs text-muted">
        Role a roda do mouse ou belisque a tela pra dar zoom, arraste pra
        mover. Clique num pino pra alternar entre faltando → incerto →
        confirmado.
      </p>
    </div>
  );
}
