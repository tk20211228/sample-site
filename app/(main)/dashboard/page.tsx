import { Button } from "@/components/ui/button";
import Link from "next/link";
import InitialSettingForm from "./components/initial-setting-form";
import DeviceList from "./components/device-list";
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <h1>ダッシュボード</h1>
      <Button variant="outline" asChild>
        <Link href="/profile">マイページへ</Link>
      </Button>
      <InitialSettingForm />
      <Suspense fallback={<div>Loading...</div>}>
        <DeviceList />
      </Suspense>
    </div>
  );
}
