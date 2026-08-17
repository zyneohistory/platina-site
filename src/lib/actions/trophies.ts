"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleTrophy(
  trophyId: string,
  gameSlug: string,
  earned: boolean,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("trophy_progress").upsert(
    {
      user_id: user.id,
      trophy_id: trophyId,
      earned,
      earned_at: earned ? new Date().toISOString() : null,
    },
    { onConflict: "user_id,trophy_id" },
  );

  revalidatePath(`/jogos/${gameSlug}/trofeus`);
  revalidatePath(`/jogos/${gameSlug}`);
}
