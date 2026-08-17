import { createClient } from "@/lib/supabase/server";
import { CollectibleToggle } from "@/components/collectible-toggle";
import type { CollectibleStatusKey } from "@/lib/grades";

type RegionRow = {
  id: string;
  name: string;
  parent_region_id: string | null;
  sort_order: number;
};

type CollectibleRow = {
  id: string;
  name: string;
  region_id: string;
  collectible_type_id: string;
  sort_order: number;
};

type CollectibleTypeRow = { id: string; name: string; slug: string };

export default async function RegionsPage({
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [
    { data: regionsData },
    { data: collectibleTypesData },
    { data: collectiblesData },
    { data: progressRows },
  ] = await Promise.all([
    supabase
      .from("regions")
      .select("id, name, parent_region_id, sort_order")
      .eq("game_id", game!.id)
      .order("sort_order"),
    supabase
      .from("collectible_types")
      .select("id, name, slug")
      .eq("game_id", game!.id),
    supabase
      .from("collectibles")
      .select("id, name, region_id, collectible_type_id, sort_order")
      .eq("game_id", game!.id)
      .order("sort_order"),
    supabase
      .from("collectible_progress")
      .select("collectible_id, status")
      .eq("user_id", user!.id),
  ]);

  const regions: RegionRow[] = regionsData ?? [];
  const collectibleTypes: CollectibleTypeRow[] = collectibleTypesData ?? [];
  const collectibles: CollectibleRow[] = collectiblesData ?? [];

  const statusMap = new Map<string, CollectibleStatusKey>(
    (progressRows ?? []).map((p) => [
      p.collectible_id,
      p.status as CollectibleStatusKey,
    ]),
  );
  const typeById = new Map(collectibleTypes.map((t) => [t.id, t]));

  const childrenByParent = new Map<string, RegionRow[]>();
  for (const r of regions) {
    if (r.parent_region_id) {
      const list = childrenByParent.get(r.parent_region_id) ?? [];
      list.push(r);
      childrenByParent.set(r.parent_region_id, list);
    }
  }
  const topLevelRegions = regions.filter((r) => !r.parent_region_id);

  function renderRegion(region: RegionRow, depth = 0): React.ReactNode {
    const items = collectibles.filter((c) => c.region_id === region.id);
    const children = childrenByParent.get(region.id) ?? [];

    if (items.length === 0 && children.length === 0) return null;

    const byType = new Map<string, CollectibleRow[]>();
    for (const item of items) {
      const list = byType.get(item.collectible_type_id) ?? [];
      list.push(item);
      byType.set(item.collectible_type_id, list);
    }

    return (
      <div
        key={region.id}
        className={
          depth === 0
            ? "rounded-xl border border-border bg-surface p-4"
            : "border-t border-border-soft pt-4"
        }
      >
        <h3 className="font-medium">{region.name}</h3>

        {[...byType.entries()].map(([typeId, typeItems]) => {
          const type = typeById.get(typeId);
          const completed = typeItems.filter(
            (i) => statusMap.get(i.id) === "completed",
          ).length;

          return (
            <div key={typeId} className="mt-3">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted">{type?.name ?? "Coletável"}</span>
                <span className="font-medium text-teal">
                  {completed}/{typeItems.length}
                </span>
              </div>
              <ul className="space-y-1.5">
                {typeItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-lg bg-surface-2 px-3 py-2"
                  >
                    <span className="text-sm">{item.name}</span>
                    <CollectibleToggle
                      collectibleId={item.id}
                      gameSlug={slug}
                      status={statusMap.get(item.id) ?? "missing"}
                    />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}

        {children.map((child) => (
          <div key={child.id} className="mt-4">
            {renderRegion(child, depth + 1)}
          </div>
        ))}
      </div>
    );
  }

  const rendered = topLevelRegions
    .map((r) => renderRegion(r))
    .filter(Boolean);

  return (
    <div className="space-y-4">
      {rendered.length === 0 && (
        <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
          Nenhuma região cadastrada ainda. Assim que os dados de God of War
          (2018) forem importados, as regiões e coletáveis aparecem aqui.
        </p>
      )}
      {rendered}
    </div>
  );
}
