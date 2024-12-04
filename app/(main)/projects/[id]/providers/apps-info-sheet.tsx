"use client";

import { androidmanagement_v1 } from "googleapis";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";
import { getAppInfo } from "../apps/actions/get-app-info";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLinkIcon, FileIcon } from "lucide-react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type AppInfo = androidmanagement_v1.Schema$Application;

type ContextType = {
  isPending?: boolean;
};

const Context = createContext<ContextType>({
  isPending: false,
} as ContextType);

export function AppsInfoSheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [appInfo, setAppInfo] = useState<AppInfo>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return null;
      startTransition(async () => {
        const appInfo = await getAppInfo(id);
        //5秒待機
        // await new Promise((resolve) => setTimeout(resolve, 5000));
        setAppInfo(appInfo);
        if (appInfo) {
          setIsOpen(true);
        }
      });
    };

    fetchData();
  }, [id]);

  const handleDownloadJson = () => {
    try {
      if (!appInfo?.name) {
        toast.error("アプリケーション情報が取得できていません");
        return;
      }
      window.location.href = `/api/download?name=${appInfo?.name}`;
      setIsOpen(false);
    } catch (error) {
      toast.error("アプリケーション情報の取得に失敗しました");
      console.error(error);
    }
  };

  return (
    <Context.Provider
      value={{
        isPending,
      }}
    >
      {children}
      <Sheet
        open={isOpen}
        onOpenChange={(isOpen) => {
          setIsOpen(isOpen);
          if (!isOpen) {
            router.push(pathname);
          }
        }}
      >
        <SheetContent
          side="left"
          className="w-[90vw] sm:w-[600px] sm:max-w-full p-0"
        >
          <ScrollArea className="h-full p-6">
            <SheetHeader>
              <SheetTitle>アプリケーション情報</SheetTitle>
              <SheetDescription>
                <span className="sr-only">
                  アプリケーションの詳細情報を表示
                </span>
              </SheetDescription>
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
              <div className="flex justify-between p-1">
                <Button
                  variant="outline"
                  onClick={handleDownloadJson}
                  disabled={!appInfo?.name}
                >
                  <FileIcon className="w-4 h-4 mr-2" />
                  JSONで出力する
                </Button>
                <Button
                  variant="outline"
                  asChild
                  disabled={!appInfo?.playStoreUrl}
                >
                  <Link href={appInfo?.playStoreUrl || ""}>
                    <ExternalLinkIcon className="w-4 h-4 mr-2" />
                    Play Store を開く
                  </Link>
                </Button>
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </Context.Provider>
  );
}

export const useAppsInfoSheet = () => useContext(Context);
