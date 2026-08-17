import Link from "next/link";
import { logout } from "@/app/auth/actions";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="border-b border-border-soft">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-wide text-gold"
          >
            PLATINA TRACKER
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="text-sm text-muted transition hover:text-foreground"
            >
              Sair
            </button>
          </form>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  );
}
