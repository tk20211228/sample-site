import { Database } from "@/types/database"; // 公式ドキュメントにはないが一応、型定義を追加
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient<Database>( // 公式ドキュメントにはないが一応、型定義を追加
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
