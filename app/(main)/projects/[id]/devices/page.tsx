import { Suspense } from "react";
import DevicesContent from "./components/devices-content";

export default async function Page() {
  return (
    // <div className="flex flex-row h-dvh p-1 border space-x-1 overflow-hidden">
    <div className="flex h-dvh space-x-1">
      <Suspense fallback={<div>Loading...</div>}>
        <DevicesContent />
      </Suspense>
    </div>
  );
}
