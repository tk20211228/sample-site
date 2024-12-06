"use client";

import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { useApps } from "../../data/use-apps";
import { useWebToken } from "../../data/use-web-token";
import { initializePlayIframe } from "../../lib/initialize-iframe";
import { useGapiIframes } from "../../../providers/gapi-iframes";

export default function PrivateAppIframe({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null); // iframeを配置するコンテナ
  const isInitializedRef = useRef(false); // 初期化フラグ
  const params = useParams();
  const { isLoaded } = useGapiIframes();
  const enterpriseName = "enterprises/" + params.id;
  const appType = "PRIVATE";
  const tokenType = "PRIVATE_APPS";
  const iframeKey = "/api/private/iframe";
  const tableKey = "/api/apps/" + appType;

  const { mutate } = useApps(tableKey, enterpriseName, appType);
  const { token, error } = useWebToken(iframeKey, enterpriseName, tokenType);

  const initialize = useCallback(
    (token: string) => {
      if (isInitializedRef.current) {
        // console.log("既に初期化済みです"); // ２回目以降画面を開くと前回のトークンと最新トークンが取得されるため初期化が２回実行される。そのため、初期化フラグを設定
        return;
      }
      const success = initializePlayIframe({
        token,
        containerRef,
        enterpriseName,
        appType,
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
    [enterpriseName, mutate]
  );

  useEffect(() => {
    console.log("private token", token);
    if (token && isLoaded) {
      initialize(token);
    }
  }, [initialize, token, isLoaded]);

  if (error) {
    toast.error("トークンの取得に失敗しました" + error);
  }

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-full relative", className)}
      aria-label="Google Play ウェブアプリ"
      role="region"
    />
  );
}
