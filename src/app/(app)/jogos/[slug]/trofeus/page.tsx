import { createClient } from "@/lib/supabase/server";
import { TrophyList } from "@/components/trophy-list";
import type { TrophyGradeKey } from "@/lib/grades";

export default async function TrophiesPage({
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

  const [{ data: trophies }, { data: progressRows }] = await Promise.all([
    supabase
      .from("trophies")
      .select("id, name, description, grade, sort_order, is_secret, rarity_percent")
      .eq("game_id", game!.id)
      .order("sort_order"),
    supabase
      .from("trophy_progress")
      .select("trophy_id, earned")
      .eq("user_id", user!.id),
  ]);

  const earnedMap = new Map(
    (progressRows ?? []).map((p) => [p.trophy_id, p.earned]),
  );

  if (!trophies || trophies.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
        Nenhum troféu cadastrado ainda. Assim que os dados de God of War
        (2018) forem importados, a lista completa aparece aqui.
      </p>
    );
  }

  const list = trophies.map((t) => ({
    id: t.id,
    name: t.name,
    description: t.description,
    grade: t.grade as TrophyGradeKey,
    isSecret: t.is_secret,
    earned: earnedMap.get(t.id) ?? false,
    rarityPercent: t.rarity_percent,
  }));

  return <TrophyList trophies={list} gameSlug={slug} />;
}
