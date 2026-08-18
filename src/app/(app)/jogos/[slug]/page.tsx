import { createClient } from "@/lib/supabase/server";
import { ProgressBar } from "@/components/progress-bar";
import { TrophyIcon } from "@/components/trophy-icon";
import { TROPHY_GRADES } from "@/lib/grades";

export default async function GameOverviewPage({
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

  const { data: progress } = await supabase
    .from("game_progress")
    .select("*")
    .eq("game_id", game!.id)
    .maybeSingle();

  const trophiesTotal = progress?.trophies_total ?? 0;
  const trophiesEarned = progress?.trophies_earned ?? 0;
  const percent = progress?.percent_complete ?? 0;

  const grades = [
    {
      key: "platinum" as const,
      total: progress?.platinum_total ?? 0,
      earned: progress?.platinum_earned ?? 0,
    },
    {
      key: "gold" as const,
      total: progress?.gold_total ?? 0,
      earned: progress?.gold_earned ?? 0,
    },
    {
      key: "silver" as const,
      total: progress?.silver_total ?? 0,
      earned: progress?.silver_earned ?? 0,
    },
    {
      key: "bronze" as const,
      total: progress?.bronze_total ?? 0,
      earned: progress?.bronze_earned ?? 0,
    },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-border bg-surface p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-medium tracking-wide text-muted uppercase">
            Progresso geral
          </h2>
          <span className="text-2xl font-semibold text-gold">{percent}%</span>
        </div>
        <div className="mt-3">
          <ProgressBar value={percent} />
        </div>
        <p className="mt-2 text-sm text-muted">
          {trophiesEarned} de {trophiesTotal} troféus conquistados
        </p>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {grades.map((g) => {
          const style = TROPHY_GRADES[g.key];
          const complete = g.total > 0 && g.earned === g.total;
          return (
            <div
              key={g.key}
              className="rounded-xl border border-border bg-surface p-4 text-center"
            >
              <div
                className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg"
                style={{
                  background: complete ? `${style.color}1f` : "var(--surface-2)",
                  boxShadow: complete ? `0 0 16px ${style.color}55` : "none",
                }}
              >
                <TrophyIcon color={style.color} filled={complete} className="h-6 w-6" />
              </div>
              <p className="text-lg font-semibold">
                {g.earned}/{g.total}
              </p>
              <p className="text-xs text-muted">{style.label}</p>
            </div>
          );
        })}
      </section>

      {trophiesTotal === 0 && (
        <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
          Nenhum troféu cadastrado ainda. Assim que os dados de God of War
          (2018) forem importados, o progresso aparece aqui.
        </p>
      )}
    </div>
  );
}
