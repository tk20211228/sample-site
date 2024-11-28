import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLinkIcon } from "lucide-react";
import { androidmanagement_v1 } from "googleapis";

type AppData = androidmanagement_v1.Schema$Application;

export default function AppSonner({ appData }: { appData: AppData }) {
  return (
    <div className="flex flex-row">
      <div className="flex items-center justify-center">
        <div className="aspect-square overflow-hidden border-2 rounded-lg">
          <Image
            src={appData.iconUrl ?? ""}
            alt={appData.title ?? ""}
            height={80}
            width={80}
          />
        </div>
      </div>
      <div className="flex flex-col ml-4 space-y-1">
        <div>選択したアプリの情報を取得しました。</div>
        <div className="text-sm text-muted-foreground">
          アプリ名：{appData.title ?? ""}
        </div>
        <div className="flex justify-end">
          <Button
            variant="outline"
            className="text-xs px-3 h-8"
            onClick={() => window.open(`${appData.playStoreUrl}`, "_blank")}
          >
            Play Storeで確認する
            <ExternalLinkIcon className="size-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
