"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePolicy } from "../../../providers/policy";

interface DisabledAppsProps {
  id?: string;
}

export default function DisabledApps({
  id = "disabledApps",
}: DisabledAppsProps) {
  const [isClient, setIsClient] = useState(false);
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const { apps } = usePolicy();
  const disabledApps = useMemo(() => {
    const appList = apps
      .filter((app) => app.installType !== "BLOCKED") //インストールタイプがBLOCKEDのアプリを場外
      .filter((app) => app.disabled === true); //無効化アプリのみを返す
    //利用可能なアプリを返す
    return appList;
  }, [apps]);

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
        <CardTitle>アプリ無効化</CardTitle>
      </CardHeader>
      <CardContent>
        {disabledApps.length === 0 ? (
          <p className="text-muted-foreground text-center">
            アプリケーションをドロップしてください
          </p>
        ) : (
          <div className="grid grid-cols-10 gap-2">
            {disabledApps.map((app) => (
              <Image
                key={app.id}
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
