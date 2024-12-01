"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import useSWR from "swr";

import { getAndroidEnterpriseWebToken } from "@/actions/emm/get-web-token";
import { AppData } from "@/app/(main)/types/apps";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { getAppData } from "../../data/get-playstore-app";
import { IFRAME_CONFIG } from "../../data/public-app-iframe-config";
import AppSonner from "./table/app-sonner";

type SelectEvent = {
  action: "selected";
  packageName: string;
};

// declare const gapi: any;
declare const gapi: {
  load: (api: string, callback: () => void) => void;
  iframes: {
    getContext: () => {
      openChild: (options: {
        url: string;
        where: HTMLElement | null;
        attributes: Record<string, string>;
      }) => {
        register: (
          eventName: string,
          callback: (event: SelectEvent) => void,
          filter: unknown
        ) => void;
      };
    };
    CROSS_ORIGIN_IFRAMES_FILTER: unknown;
  };
};

export default function PublicAppsIframe({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null); // iframeを配置するコンテナ
  const isInitializedRef = useRef(false); // 初期化フラグ
  const params = useParams();
  const enterpriseId = params.id;
  const enterpriseName = "enterprises/" + enterpriseId;

  const { data, error } = useSWR(enterpriseName, getAndroidEnterpriseWebToken);

  console.log(data?.token);

  const initializeIframe = useCallback(
    (token: string) => {
      console.log("初期化を開始");
      if (!window.gapi) return console.log("gapiが読み込まれていません");
      const iframeUrl = `${IFRAME_CONFIG.BASE_URL}?token=${token}&locale=${IFRAME_CONFIG.LOCALE}&mode=${IFRAME_CONFIG.MODE}&showsearchbox=true`;
      if (!containerRef.current || !iframeUrl)
        return console.log("iframeのコンテナが読み込まれていません");
      console.log("iframeのコンテナが読み込まれています");

      try {
        const options = {
          url: iframeUrl,
          where: containerRef.current,
          attributes: IFRAME_CONFIG.IFRAME_STYLE,
        };
        const iframe = gapi.iframes.getContext().openChild(options);
        isInitializedRef.current = true;

        const handleProductSelect = async (event: SelectEvent) => {
          if (event.action === "selected") {
            const appData = await getAppData(event.packageName, enterpriseName);
            toast.success(
              <AppSonner appData={appData.app_details as AppData} />
            );
          }
        };

        iframe.register(
          "onproductselect",
          handleProductSelect,
          gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
        );
        console.log("iframeの初期化に成功");
      } catch (error) {
        console.error("Failed to initialize iframe:", error);
        toast.error("iFrameの初期化に失敗しました");
      }
    },
    [enterpriseName]
  );

  useEffect(() => {
    if (isInitializedRef.current || !data?.token)
      return console.log("初期化済みか、アクセストークンが取得できていません");
    initializeIframe(data.token);
    console.log("iframeを初期化");

    return () => {
      isInitializedRef.current = false; // 初期化フラグをリセット
      console.log("リセット");
    };
  }, [initializeIframe, data?.token]);

  if (error) {
    toast.error("アクセストークンの取得に失敗しました。" + error);
  }

  return (
    <>
      <Script
        src="https://apis.google.com/js/api.js"
        strategy="afterInteractive"
        onLoad={() => {
          gapi.load("gapi.iframes", () => {
            if (!data?.token)
              return console.log("アクセストークンが取得できていません");
            console.log("アクセストークンが取得できています");
            initializeIframe(data.token);
          });
        }}
      />
      <div
        ref={containerRef}
        className={cn("w-full h-full relative", className)}
        aria-label="Google Play 公開アプリ検索"
        role="region"
      />
    </>
  );
}

// // シナリオ1: 通常の初期化フロー
// 1. コンポーネントがマウントされる
// 2. useEffect が実行される
// 3. isInitializedRef.current は false なので、initializeIframe() が実行される
// 4. iframe が初期化され、isInitializedRef.current が true になる

// // シナリオ2: Script onLoad による初期化
// 1. Script の onLoad イベントが発火
// 2. window.gapi.load が initializeIframe を呼び出す
// 3. isInitializedRef.current が既に true なので、二重初期化を防ぐ

// // シナリオ3: 再レンダリングによる不要な初期化の防止
// 1. 親コンポーネントの状態が変更される
// 2. PublicAppsIframe コンポーネントが再レンダリングされる
// 3. useEffect が再度実行される
// 4. isInitializedRef.current が true なので、不要な初期化をスキップ
