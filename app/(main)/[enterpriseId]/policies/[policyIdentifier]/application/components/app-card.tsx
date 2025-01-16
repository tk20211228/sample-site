"use client";

import { Apps } from "@/app/types/policy";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { SiGoogleplay } from "@icons-pack/react-simple-icons";
import { EllipsisIcon, GlobeLockIcon, LockIcon, RefreshCw } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AppCard({ app }: { app: Apps }) {
  const [isClient, setIsClient] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: app.appId,
    data: app,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleResetAppPolicy = () => {
    console.log("reset app policy");
    console.log("app", app);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="cursor-grab relative"
    >
      <CardContent
        className={cn(
          "flex items-center space-x-2 p-4"
          // app.installType === "BLOCKED" ? "bg-muted/50" : "",
        )}
      >
        <div className="relative">
          <div className="relative border rounded-md size-10 overflow-hidden">
            <Image src={app.iconUrl} alt={app.title} fill sizes="40px" />
          </div>
          {app.appType === "PUBLIC" ? (
            <SiGoogleplay className="size-4 text-muted-foreground absolute -top-3 -right-3" />
          ) : app.appType === "PRIVATE" ? (
            <LockIcon className="size-4 text-muted-foreground absolute -top-3 -right-3" />
          ) : (
            <GlobeLockIcon className="size-4 text-muted-foreground absolute -top-3 -right-3" />
          )}
        </div>

        <CardTitle className="truncate text-lg pl-2 w-full" title={app.title}>
          {app.title}
        </CardTitle>
        {/* <span className="flex-1"></span> */}
        <Separator orientation="vertical" className="h-10 mx-1" />

        {(app.installType || app.disabled) && (
          <div className="w-[205px]">
            <Badge
              variant={
                app.installType === "BLOCKED" ? "destructive" : "secondary"
              }
            >
              {app.installType === "BLOCKED"
                ? "インストール不可"
                : app.installType === "FORCE_INSTALLED"
                ? "自動インストール"
                : app.disabled
                ? "アプリ無効"
                : ""}
            </Badge>
          </div>
        )}

        {/* <Button variant="ghost" size="icon" className="z-10">
          <MenuIcon className="size-4 mx-2" />
        </Button> */}
        <DropdownMenu data-no-dnd>
          <DropdownMenuTrigger asChild data-no-dnd>
            <Button variant="ghost" size="icon" className="z-10" data-no-dnd>
              <EllipsisIcon className="size-4 mx-2" data-no-dnd />
              <span className="sr-only">メニューを開く</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent
              className=" space-y-1 px-2"
              align="end"
              data-no-dnd
            >
              <DropdownMenuItem onSelect={handleResetAppPolicy} data-no-dnd>
                <RefreshCw className="mr-4 size-4" data-no-dnd />
                <span>設定をリセット</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </CardContent>
      {app.installType === "BLOCKED" && (
        <span className="absolute inset-0 bg-muted/50" />
      )}
    </Card>
  );
}
