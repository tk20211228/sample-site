"use client";

import AvailableApps from "./available-apps";
import DisabledApps from "./disabled-apps";
import RestrictedApps from "./restricted-apps";

export default function AppManagement() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">アプリケーション管理</h2>
      <AvailableApps />
      <RestrictedApps />
      <DisabledApps />
    </div>
  );
}
