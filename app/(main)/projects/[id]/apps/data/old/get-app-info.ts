// "use server";

// import { createClient } from "@/lib/supabase/server";
// import { NextResponse } from "next/server";

// export const downloadAppInfo = async (name: string) => {
//   const supabase = await createClient();
//   const { data, error } = await supabase
//     .from("apps")
//     .select("app_details")
//     .eq("name", name)
//     .single();
//   if (error) {
//     throw new Error(error.message);
//   }

//   // JSONデータを文字列に変換
//   const jsonString = JSON.stringify(data.app_details, null, 2);

//   // Blobを作成
//   const blob = new Blob([jsonString], { type: "application/json" });

//   // ファイル名を設定
//   const fileName = `${name}_app_details.json`;

//   return new NextResponse(blob, {
//     headers: {
//       "Content-Type": "application/json",
//       "Content-Disposition": `attachment; filename="${fileName}"`,
//     },
//   });
// };
