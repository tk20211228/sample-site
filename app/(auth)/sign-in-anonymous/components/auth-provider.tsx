"use client";

// Supabaseクライアントを作成するための関数をインポート
import { createClient } from "@/lib/supabase/client";
// SupabaseのUser型をインポート
import { User } from "@supabase/supabase-js";
// Next.jsのルーターをインポート
import { useRouter } from "next/navigation";
// Reactの必要なフックと型をインポート
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// コンテキストの型を定義
type ContextType = {
  authUser?: User | null; // 認証ユーザー情報
  isLoading: boolean; // ローディング状態
};

// コンテキストを作成
const Context = createContext<ContextType>({} as ContextType);

// 認証プロバイダーコンポーネント
export function AuthProviderProvider({ children }: { children: ReactNode }) {
  // 認証ユーザーの状態を管理するためのフック
  const [authUser, setAuthUser] = useState<User | null>();
  console.log("authUser", authUser);

  // Supabaseクライアントを作成
  const supabase = createClient();

  // 認証状態の変更を監視するエフェクト
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      // 認証ユーザーの状態を更新
      setAuthUser(session?.user || null);
    });

    // クリーンアップ関数でサブスクリプションを解除
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  return (
    // コンテキストプロバイダーを返す
    <Context.Provider
      value={{
        authUser,
        isLoading: authUser === undefined, // ローディング状態を設定
      }}
    >
      {children}
    </Context.Provider>
  );
}

// 認証コンテキストを使用するためのカスタムフック
export const useAuth = (props?: { redirect?: boolean }) => {
  // コンテキストを取得
  const context = useContext(Context);
  // ルーターを取得
  const router = useRouter();

  // 認証ユーザーがいない場合、リダイレクトオプションが有効ならログインページにリダイレクト
  if (context.authUser === null && props?.redirect) {
    router.push("/sign-in");
  }

  return context;
};
