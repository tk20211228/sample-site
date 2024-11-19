import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DevicesMenuBar({ className }: { className?: string }) {
  return (
    <div className={cn(`w-64 h-dvh border-r flex flex-col`, className)}>
      <div className="border-b flex min-h-12 items-center px-6">
        <h4 className="text-lg font-bold">デバイス</h4>
      </div>
      <div className="flex-grow overflow-y-auto">
        <nav aria-label="オプションバー" className="flex flex-col">
          <ul className="border-b">
            <section className="my-6 mx-3">
              <h4 className="px-3 mb-2 font-mono text-sm text-muted-foreground">
                デバイス一覧
              </h4>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                テーブル
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
                操作ログ
              </Button>
            </section>
          </ul>
          <ul className="border-b">
            <section className="my-6 mx-3">
              <h4 className="px-3 mb-2 font-mono text-sm text-muted-foreground">
                紛失モード
              </h4>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                位置情報
              </Button>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                イベントログ
              </Button>
            </section>
          </ul>
          <ul className="border-b">
            <section className="my-6 mx-3">
              <h4 className="px-3 mb-2 font-mono text-sm text-muted-foreground gap-2">
                ゼロタッチ
              </h4>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                手動設定
                <span className="text-xs text-muted-foreground">
                  (近日リリース)
                </span>
              </Button>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                自動設定
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
