"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ExternalLinkIcon, FileIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppsInfoSheet } from "../../../providers/apps-info-sheet";

export default function AppInfoSheet() {
  const { isOpen, setIsOpen, appInfo } = useAppsInfoSheet();

  const handleDownloadJson = () => {
    window.location.href = `/api/download?name=${appInfo?.name}`;
    console.log(`/api/download?name=${appInfo?.name}`);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent
        side="left"
        className="w-[90vw] sm:w-[600px] sm:max-w-full p-0"
      >
        <ScrollArea className="h-full p-6">
          <SheetHeader>
            <SheetTitle>アプリケーション情報</SheetTitle>
          </SheetHeader>
          <div className="mt-4 space-y-6">
            <div className="flex items-center space-x-4">
              <Image
                src={appInfo?.iconUrl || ""}
                alt={appInfo?.name || ""}
                width={64}
                height={64}
                className="rounded-lg border"
              />
              <div>
                <h2 className="text-xl font-bold">{appInfo?.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {appInfo?.author}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">バージョン</h3>
              <p>{appInfo?.appVersions?.[0]?.versionString}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">minSdkVersion</h3>
              <p>{appInfo?.minAndroidSdkVersion}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">支払い</h3>
              <p>{appInfo?.appPricing}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">最終更新日</h3>
              <p>{appInfo?.updateTime}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">説明</h3>x
              <ScrollArea className="h-[300px]">
                <p className="text-sm">{appInfo?.fullDescription}</p>
              </ScrollArea>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={appInfo?.playStoreUrl || ""}>
                  <ExternalLinkIcon className="w-4 h-4 mr-2" />
                  Play Store を開く
                </Link>
              </Button>
              <Button variant="outline" onClick={handleDownloadJson}>
                <FileIcon className="w-4 h-4 mr-2" />
                JSONで出力する
              </Button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
