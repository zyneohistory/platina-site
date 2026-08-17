"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { Enums } from "@/lib/supabase/database.types";

export async function cycleCollectibleStatus(
  collectibleId: string,
  gameSlug: string,
  nextStatus: Enums<"collectible_status">,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase.from("collectible_progress").upsert(
    {
      user_id: user.id,
      collectible_id: collectibleId,
      status: nextStatus,
    },
    { onConflict: "user_id,collectible_id" },
  );

  revalidatePath(`/jogos/${gameSlug}/regioes`);
  revalidatePath(`/jogos/${gameSlug}/mapa`);
}
