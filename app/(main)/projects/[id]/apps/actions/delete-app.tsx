"use server";

import { createClient } from "@/lib/supabase/server";

export const deleteApp = async (appName: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from("apps").delete().eq("name", appName);
  if (error) {
    throw new Error(error.message);
  }
  return error;
};
