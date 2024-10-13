"use server";

import { currentUser } from "@/app/data/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const addComment = async (formData: FormData) => {
  const supabase = createClient();

  const user = await currentUser();
  if (!user) {
    throw new Error("ログインしてください。");
  }
  const body = formData.get("body") as string;
  console.log("body", body);
  const { data, error } = await supabase
    .from("comments")
    .insert({ body, userId: user.id });
  console.log(data, error);
  revalidatePath("/comments");
};

export const deleteComment = async (id: number) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("ログインしてください。");
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)
    .eq("userId", user.id);
  console.log(data, error);
  revalidatePath("/comments");
};

export const updateComment = async (id: number, body: string) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("ログインしてください。");
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from("comments")
    .update({ body })
    .eq("id", id)
    .eq("userId", user.id);
  console.log(data, error);
  revalidatePath("/comments");
};
