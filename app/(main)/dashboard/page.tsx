import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Suspense } from "react";
import AppsManagement from "./components/apps/apps-management";
import PolicyList from "./components/policy/policy-list";

export default function Page() {
  return (
    <div className="flex">
      <div className="flex flex-col gap-2 p-2 flex-1">
        <div className="flex gap-2">
          <Button variant="outline" className="w-32" asChild>
            <Link href="/profile">マイページへ</Link>
          </Button>
          <Button variant="outline" className="" asChild>
            <Link href="/projects">プロジェクト管理ページへ</Link>
          </Button>
        </div>
        <h1>ダッシュボード</h1>

        <Suspense fallback={<div>Loading...</div>}>
          <PolicyList />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AppsManagement />
        </Suspense>
      </div>
    </div>
  );
}
