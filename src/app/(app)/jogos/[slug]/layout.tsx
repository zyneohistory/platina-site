import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TabsNav } from "@/components/tabs-nav";

export default async function GameLayout({
  params,
  children,
}: {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: game } = await supabase
    .from("games")
    .select("title, platform, cover_url, release_date")
    .eq("slug", slug)
    .maybeSingle();

  if (!game) {
    notFound();
  }

  const tabs = [
    { label: "Visão Geral", href: `/jogos/${slug}` },
    { label: "Troféus", href: `/jogos/${slug}/trofeus` },
    { label: "Regiões", href: `/jogos/${slug}/regioes` },
    { label: "Guia", disabled: true },
    { label: "Mapa", href: `/jogos/${slug}/mapa` },
    { label: "Copiloto", disabled: true },
  ];

  return (
    <div>
      <header className="border-b border-border-soft bg-surface/60">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-6 sm:px-6">
          {game.cover_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={game.cover_url}
              alt=""
              className="h-20 w-20 rounded-lg object-cover ring-1 ring-border"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-surface-2 text-2xl font-bold text-gold ring-1 ring-border">
              {game.title.charAt(0)}
            </div>
          )}
          <div>
            <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
              {game.title}
            </h1>
            <p className="text-sm text-muted">
              {game.platform}
              {game.release_date
                ? ` · ${new Date(game.release_date).getFullYear()}`
                : ""}
            </p>
          </div>
        </div>
        <TabsNav tabs={tabs} />
      </header>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</div>
    </div>
  );
}
