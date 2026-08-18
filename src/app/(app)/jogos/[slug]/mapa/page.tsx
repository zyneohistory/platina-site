import { createClient } from "@/lib/supabase/server";
import { InteractiveMap, type MapPinData } from "@/components/interactive-map";
import type { CollectibleStatusKey } from "@/lib/grades";

export default async function MapPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: game } = await supabase
    .from("games")
    .select("id")
    .eq("slug", slug)
    .single();

  const { data: mapRegion } = await supabase
    .from("regions")
    .select("id, name, map_image_url")
    .eq("game_id", game!.id)
    .not("map_image_url", "is", null)
    .maybeSingle();

  if (!mapRegion) {
    return (
      <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
        Nenhum mapa cadastrado ainda.
      </p>
    );
  }

  const { data: descendantRegions } = await supabase
    .from("regions")
    .select("id")
    .or(`id.eq.${mapRegion.id},parent_region_id.eq.${mapRegion.id}`);

  const regionIds = (descendantRegions ?? []).map((r) => r.id);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [{ data: collectiblesData }, { data: progressRows }, { data: typesData }] =
    await Promise.all([
      supabase
        .from("collectibles")
        .select("id, name, region_id, collectible_type_id, coord_x, coord_y")
        .in("region_id", regionIds)
        .not("coord_x", "is", null),
      supabase
        .from("collectible_progress")
        .select("collectible_id, status")
        .eq("user_id", user!.id),
      supabase.from("collectible_types").select("id, name, slug"),
    ]);

  const statusMap = new Map<string, CollectibleStatusKey>(
    (progressRows ?? []).map((p) => [
      p.collectible_id,
      p.status as CollectibleStatusKey,
    ]),
  );
  const typeById = new Map(
    (typesData ?? []).map((t) => [t.id, { name: t.name, slug: t.slug }]),
  );

  const pins: MapPinData[] = (collectiblesData ?? []).map((c) => {
    const type = typeById.get(c.collectible_type_id);
    return {
      id: c.id,
      name: c.name,
      typeName: type?.name ?? "Coletável",
      typeSlug: type?.slug ?? "artifacts",
      x: Number(c.coord_x),
      y: Number(c.coord_y),
      status: statusMap.get(c.id) ?? "missing",
    };
  });

  return (
    <InteractiveMap
      imageUrl={mapRegion.map_image_url!}
      regionName={mapRegion.name}
      pins={pins}
      gameSlug={slug}
    />
  );
}
