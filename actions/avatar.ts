"use server";

import { currentUser } from "@/app/data/auth";
import { createClient } from "@/lib/supabase/server";

export const uploadImage = async (formData: FormData) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("ログインしてください。");
  }

  const supabase = await createClient();
  const file = formData.get("file") as File;
  const ext = file.name.split(".").pop(); // 拡張子を取得
  const path = `${user.id}/avatar.${ext}`;

  const { data, error } = await supabase.storage
    .from("avatars")
    .upload(path, file, {
      upsert: true, // すでにファイルが存在する場合は上書きを許可
    });
  console.log(data, error);

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(path);
  console.log(publicUrl);

  // プロフィール画像を更新
  // supabase.from("profiles").upsert({
  //   id: user.id,

  //   // キャッシュ対策でバージョンを付与
  //   avatar: `${publicUrl}?v=${Date.now()}`,
  // })
};

export const deleteImage = async () => {
  const user = await currentUser();
  if (!user) {
    throw new Error("ログインしてください。");
  }

  const supabase = await createClient();
  const path = `${user.id}/avatar.jpeg`;
  const { data, error } = await supabase.storage.from("avatars").remove([path]);
  console.log(data, error);
};
