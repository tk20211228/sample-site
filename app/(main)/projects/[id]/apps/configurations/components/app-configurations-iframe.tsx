"use client";

import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { useApps } from "../../data/use-apps";
import { useWebToken } from "../../data/use-web-token";
import { initializeConfigurationsIframe } from "../../lib/initialize-configurations-iframe";

export default function AppConfigurationsIframe({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null); // iframeを配置するコンテナ
  const isInitializedRef = useRef(false); // 初期化フラグ
  const params = useParams();
  // const { isLoaded } = useGapiIframes();
  const enterpriseName = "enterprises/" + params.id;
  const appType = "PUBLIC";
  const tokenType = "MANAGED_CONFIGURATIONS";
  const iframeKey = "/api/configurations/iframe";
  const tableKey = "/api/apps/" + appType;

  const { mutate } = useApps(tableKey, enterpriseName, appType);
  const { token, error } = useWebToken(iframeKey, enterpriseName, tokenType);
  const packageName = "com.lenovo.oemconfig.rel";
  // const packageName = "com.arlosoft.macrodroid";

  const initialize = useCallback(
    (token: string) => {
      if (isInitializedRef.current) {
        // console.log("既に初期化済みです"); // ２回目以降画面を開くと前回のトークンと最新トークンが取得されるため初期化が２回実行される。そのため、初期化フラグを設定
        return;
      }
      const success = initializeConfigurationsIframe({
        token,
        containerRef,
        enterpriseName,
        mutate,
        appType,
        packageName,
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
    // console.log("web token", token);
    if (token && window.gapi) {
      // if (token && isLoaded) {
      initialize(token);
    }
  }, [initialize, token]);

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
