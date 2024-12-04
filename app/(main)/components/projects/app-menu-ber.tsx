"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEnterprise } from "../../projects/[id]/providers/enterprise";

export default function AppsMenuBar({ className }: { className?: string }) {
  const { enterpriseId } = useEnterprise();
  return (
    <div className={cn(`w-64 h-dvh border-r flex flex-col`, className)}>
      <div className="border-b flex min-h-12 items-center px-6">
        <h4 className="text-lg font-bold">アプリ管理</h4>
      </div>
      <div className="flex-grow overflow-y-auto">
        <nav aria-label="オプションバー" className="flex flex-col">
          <ul className="border-b">
            <section className="my-6 mx-3">
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
                asChild
              >
                <Link href={`/projects/${enterpriseId}/apps`}>
                  管理アプリ一覧
                </Link>
              </Button>
            </section>
          </ul>
          <ul className="border-b">
            <section className="my-6 mx-3">
              <h4 className="px-3 mb-2 font-mono text-sm text-muted-foreground">
                アプリ種別
              </h4>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
                asChild
              >
                <Link href={`/projects/${enterpriseId}/apps/public`}>
                  Google Play アプリ
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
                asChild
              >
                <Link href={`/projects/${enterpriseId}/apps/private`}>
                  限定公開アプリ
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
                asChild
              >
                <Link href={`/projects/${enterpriseId}/apps/web`}>
                  WEB アプリ
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="w-full px-3 font-semibold justify-start gap-2"
              >
                特定アプリ
              </Button>
            </section>
          </ul>
        </nav>
      </div>
    </div>
  );
}
