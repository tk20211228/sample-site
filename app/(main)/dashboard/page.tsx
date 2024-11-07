import { Button } from "@/components/ui/button";
import Link from "next/link";
import InitialSettingForm from "./components/project/initial-setting-form";
import DeviceList from "./components/device/device-list";
import { Suspense } from "react";
import PolicyList from "./components/policy/policy-list";

export default function Page() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <h1>ダッシュボード</h1>
      <Button variant="outline" className="w-32" asChild>
        <Link href="/profile">マイページへ</Link>
      </Button>
      <InitialSettingForm />
      <Suspense fallback={<div>Loading...</div>}>
        <DeviceList />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <PolicyList />
      </Suspense>
    </div>
  );
}
