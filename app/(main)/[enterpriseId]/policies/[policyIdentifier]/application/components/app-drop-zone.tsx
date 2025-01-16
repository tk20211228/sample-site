"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Apps } from "@/app/types/policy";

interface AppDropZoneProps {
  apps: Apps[];
  id: "availableApps" | "restrictedApps" | "disabledApps";
  title: string;
  filterCondition: (app: Apps) => boolean;
}

export default function AppDropZone({
  apps,
  id,
  title,
  filterCondition,
}: AppDropZoneProps) {
  const [isClient, setIsClient] = useState(false);
  const { isOver, setNodeRef } = useDroppable({ id });

  const filteredApps = useMemo(
    () => apps.filter(filterCondition),
    [apps, filterCondition]
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <Card ref={setNodeRef} className={cn("", isOver ? "border-green-500" : "")}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredApps.length === 0 ? (
          <p className="text-muted-foreground text-center">
            アプリケーションをドロップしてください
          </p>
        ) : (
          <div className="grid grid-cols-10 gap-2">
            {filteredApps.map((app) => (
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
