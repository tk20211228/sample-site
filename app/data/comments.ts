import { createClient } from "@/lib/supabase/server";

export const getComments = async () => {
  const supabase = createClient();

  const { data: comments, error } = await supabase.from("comments").select("*");
  console.log(error);

  return comments;
  // return { comments, error };
};
