import { type EmailOtpType } from "@supabase/supabase-js";
import { type NextRequest } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  // console.log("token_hash", token_hash);
  const type = searchParams.get("type") as EmailOtpType | null;
  // console.log("type", type);
  const next = searchParams.get("next") ?? "/";
  // console.log("next", next);

  if (token_hash && type) {
    const supabase = await createClient();

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });
    // console.log("data", data);

    console.error("サインアップ処理:", error?.message);

    if (!error) {
      redirect(next);
    }
  }
  redirect("/error");
}
