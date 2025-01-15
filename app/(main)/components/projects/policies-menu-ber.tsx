"use client";

import { RouteParams } from "@/app/types/enterprise";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function PoliciesMenuBar({ className }: { className?: string }) {
  const params = useParams<RouteParams>();
  const enterpriseId = params.enterpriseId;

  return (
    <div className={cn(`w-64 h-dvh border-r flex flex-col`, className)}>
      <div className="border-b flex min-h-12 items-center px-6">
        <h4 className="text-lg font-bold">ポリシー</h4>
      </div>
      <div className="flex-grow overflow-y-auto">
        <nav aria-label="オプションバー" className="flex flex-col">
          <ul className="border-b">
            <section className="my-6 mx-3">
              <h4 className="px-3 mb-2 font-mono text-sm text-muted-foreground">
                ポリシー一覧
              </h4>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
                asChild
              >
                <Link href={`/${enterpriseId}/policies`}>テーブル</Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                詳細検索
                <span className="text-xs text-muted-foreground">
                  (近日リリース)
                </span>
              </Button>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                履歴
                <span className="text-xs text-muted-foreground">
                  (近日リリース)
                </span>
              </Button>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                作成ログ
              </Button>
            </section>
          </ul>
          <ul className="border-b">
            <section className="my-6 mx-3">
              <h4 className="px-3 mb-2 font-mono text-sm text-muted-foreground">
                ポリシー詳細
              </h4>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
                asChild
              >
                <Link href={`/${enterpriseId}/policies/general`}>端末全般</Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                画面ロック
              </Button>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                ネットワーク
              </Button>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                Google Play ストア
              </Button>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                アプリケーション
              </Button>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                Chrome ブラウザ
                <span className="text-xs text-muted-foreground">
                  (近日リリース)
                </span>
              </Button>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                操作ログ
                <span className="text-xs text-muted-foreground">
                  (近日リリース)
                </span>
              </Button>
            </section>
          </ul>
          <ul className="border-b">
            <section className="my-6 mx-3">
              <h4 className="px-3 mb-2 font-mono text-sm text-muted-foreground gap-2">
                スケジュール配信
              </h4>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                スケジュール一覧
                <span className="text-xs text-muted-foreground">
                  (近日リリース)
                </span>
              </Button>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                配信ログ
                <span className="text-xs text-muted-foreground">
                  (近日リリース)
                </span>
              </Button>
            </section>
          </ul>
        </nav>
      </div>
    </div>
  );
}
