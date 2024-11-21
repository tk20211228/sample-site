"use server";

import { createClient } from "@/lib/supabase/server";

export async function createPolicy(policyDisplayName: string) {
  console.log(policyDisplayName);
  // 認証
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  // ポリシー作成
}
