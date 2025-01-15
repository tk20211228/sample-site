"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePolicyForm } from "../../../../providers/policy-form-provider";

interface AvailableAppsProps {
  id?: string;
}

export default function AvailableApps({
  id = "availableApps",
}: AvailableAppsProps) {
  const [isClient, setIsClient] = useState(false);
  const { isOver, setNodeRef } = useDroppable({
    id,
  });
  const { apps } = usePolicyForm();
  // console.log("AvailableApps apps", apps);
  const availableApps = useMemo(() => {
    const appList = apps
      .filter((app) => app.installType === "FORCE_INSTALLED")
      .filter((app) => app.disabled !== true); //無効化アプリを場外
    //利用可能なアプリを返す
    return appList;
  }, [apps]);

  // console.log("availableApps", availableApps);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      ref={setNodeRef}
      className={cn("", isOver ? " border-green-500" : "")}
    >
      <CardHeader>
        <CardTitle>利用可能アプリ</CardTitle>
      </CardHeader>
      <CardContent>
        {availableApps.length === 0 ? (
          <p className="text-muted-foreground text-center">
            アプリケーションをドロップしてください
          </p>
        ) : (
          <div className="grid grid-cols-10 gap-2">
            {availableApps.map((app) => (
              <Image
                key={app.appId}
                src={app.iconUrl}
                alt={app.title}
                width={48}
                height={48}
                className="rounded"
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
