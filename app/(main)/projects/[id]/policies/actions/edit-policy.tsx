"use server";

import { createClient } from "@/lib/supabase/server";
import { getPolicyInfoFromSupabase } from "./policy";

export const editPolicy = async (policyName: string) => {
  console.log(policyName);
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const data = await getPolicyInfoFromSupabase(policyName);
  return data;
};
