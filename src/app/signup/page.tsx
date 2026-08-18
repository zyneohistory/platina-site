"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signup } from "@/app/auth/actions";

export default function SignupPage() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <main className="flex min-h-dvh items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="font-display text-2xl font-semibold tracking-wide text-gold">
            Platina Tracker
          </h1>
          <p className="mt-1 text-sm text-muted">Crie sua conta</p>
        </div>

        <form
          action={action}
          className="space-y-4 rounded-xl border border-border bg-surface p-6"
        >
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium tracking-wide text-muted uppercase"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm outline-none focus:border-gold"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-xs font-medium tracking-wide text-muted uppercase"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              minLength={6}
              className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm outline-none focus:border-gold"
            />
          </div>

          {state?.error && (
            <p className="text-sm text-red-400">{state.error}</p>
          )}
          {state?.message && (
            <p className="text-sm text-status-completed">{state.message}</p>
          )}

          <button
            disabled={pending}
            type="submit"
            className="w-full rounded-lg bg-gold px-3 py-2 text-sm font-semibold text-background transition hover:brightness-110 disabled:opacity-60"
          >
            {pending ? "Criando…" : "Criar conta"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-muted">
          Já tem conta?{" "}
          <Link href="/login" className="text-teal hover:underline">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
