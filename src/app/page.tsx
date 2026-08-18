import Link from "next/link";
import { TrophyIcon } from "@/components/trophy-icon";
import { ShieldIcon, ControllerIcon, BarChartIcon } from "@/components/landing-icons";

const FEATURES = [
  {
    icon: <ControllerIcon className="h-6 w-6 text-violet-400" />,
    title: "Cadastre jogos",
    description: "Adicione título, plataforma, capa e status de progresso.",
  },
  {
    icon: <TrophyIcon color="#60a5fa" filled className="h-6 w-6" />,
    title: "Controle conquistas",
    description: "Marque troféus concluídos e acompanhe o caminho para a platina.",
  },
  {
    icon: <BarChartIcon className="h-6 w-6 text-violet-400" />,
    title: "Veja estatísticas",
    description: "Descubra quantas platinas você já conquistou e horas jogadas.",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-dvh">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6 sm:px-6">
        <div className="flex items-center gap-2">
          <TrophyIcon color="#8b5cf6" filled className="h-6 w-6" />
          <span className="text-lg font-semibold">PlatinaTracker</span>
        </div>
        <Link
          href="/login"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:border-foreground/40"
        >
          Entrar
        </Link>
      </header>

      <section className="mx-auto flex max-w-3xl flex-col items-center px-4 pt-16 pb-20 text-center sm:px-6">
        <span className="mb-6 flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs text-muted">
          <ShieldIcon className="h-3.5 w-3.5" />
          Para uso próprio, com login seguro
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          Seu arsenal de{" "}
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            platinas
          </span>{" "}
          e conquistas
        </h1>
        <p className="mt-5 max-w-xl text-muted">
          Cadastre seus jogos, marque o progresso de cada conquista e
          acompanhe estatísticas do seu desempenho gamer.
        </p>
        <Link
          href="/signup"
          className="mt-8 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Começar agora
        </Link>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 gap-4 px-4 pb-20 sm:grid-cols-3 sm:px-6">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <div className="mb-3">{f.icon}</div>
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{f.description}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
