import { Button } from "@/components/ui/button";
import Link from "next/link";
import InitialSettingForm from "../projects/components/old/initial-setting-form";
import DeviceList from "./components/device/device-list";
import { Suspense } from "react";
import PolicyList from "./components/policy/policy-list";
import AppsManagement from "./components/apps/apps-management";

export default function Page() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <Button variant="outline" className="w-32" asChild>
          <Link href="/profile">マイページへ</Link>
        </Button>
        <Button variant="outline" className="" asChild>
          <Link href="/projects">プロジェクト管理ページへ</Link>
        </Button>
      </div>
      <h1>ダッシュボード</h1>
      {/* <InitialSettingForm /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <DeviceList />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <PolicyList />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <AppsManagement />
      </Suspense>
    </div>
  );
}
