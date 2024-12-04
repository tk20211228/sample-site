"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import useSWR from "swr";

import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import { toast } from "sonner";

import { initializePlayIframe } from "../../lib/initialize-iframe";
import { getAndroidManagementWebToken } from "../../actions/get-web-token";
import { useApps } from "../../data/use-apps";

export default function PrivateAppIframe({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null); // iframeを配置するコンテナ
  const isInitializedRef = useRef(false); // 初期化フラグ
  const params = useParams();
  const pathname = usePathname();
  const enterpriseId = params.id;
  const enterpriseName = "enterprises/" + enterpriseId;
  const tokenType = "PRIVATE";
  const { mutate } = useApps("/api/apps/private", enterpriseName, tokenType);

  const { data, error } = useSWR(
    pathname,
    () => getAndroidManagementWebToken(enterpriseName, tokenType),
    {
      // dedupingInterval: 3600000, // enterpriseIdが同じ場合は1時間、関数を実行しない
      revalidateOnFocus: false, // タブ移動しても関数を実行しない
      // keepPreviousData: false, // 前のデータを保持しない
    }
  );

  const initialize = useCallback(
    (value: string) => {
      if (isInitializedRef.current) {
        console.log("既に初期化済みです"); // ２回目以降画面を開くと前回のトークンと最新トークンが取得されるため初期化が２回実行される。そのため、初期化フラグを設定
        return;
      }
      const success = initializePlayIframe({
        token: value,
        containerRef,
        enterpriseName,
        mutate,
        onSuccess: () => {
          isInitializedRef.current = true;
        },
        onError: (error) => {
          toast.error("iframeの初期化に失敗しました" + error);
        },
      });

      if (!success) {
        isInitializedRef.current = false;
      }
    },
    [enterpriseName]
  );

  useEffect(() => {
    // console.log("private token", data?.value);
    if (data?.value) {
      initialize(data.value);
    }
  }, [initialize, data?.value]);

  if (error) {
    toast.error("アクセストークンの取得に失敗しました。" + error);
  }

  return (
    <>
      <Script
        src="https://apis.google.com/js/api.js"
        onLoad={() => {
          gapi.load("gapi.iframes", () => {});
        }}
      />
      <div
        ref={containerRef}
        className={cn("w-full h-full relative", className)}
        aria-label="Google Play 非公開アプリ"
        role="region"
      />
    </>
  );
}
