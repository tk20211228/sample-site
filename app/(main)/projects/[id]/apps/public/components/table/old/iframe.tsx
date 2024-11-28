// "use client";

// import Script from "next/script";
// import { useCallback, useEffect, useMemo, useRef } from "react";

// import { AppData } from "@/app/(main)/types/apps";
// import { toast } from "sonner";
// import { getAppData } from "../../../../data/get-playstore-app";
// import AppSonner from "../app-sonner";

// type SelectEvent = {
//   action: "selected";
//   packageName: string;
// };

// type WebTokenType = { token?: string | null; value?: string | null };

// export default function Iframe({
//   webToken,
//   enterpriseName,
// }: {
//   webToken: WebTokenType;
//   enterpriseName: string;
// }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const iframeInitializedRef = useRef(false);
//   const token = webToken.token ?? webToken.value;
//   if (!token) {
//     console.error("Token is missing");
//     toast.error("アクセストークンがありません。");
//     return;
//   }
//   const IFRAME_CONFIG = {
//     LOCALE: "ja_JP",
//     MODE: "APPROVE",
//     BASE_URL: "https://play.google.com/work/embedded/search",
//     IFRAME_STYLE: {
//       style: "width: 100%; height: 100%;",
//       scrolling: "yes",
//     },
//     API_SCRIPT_URL: "https://apis.google.com/js/api.js",
//   } as const;

//   const getIframeUrl = (token: string) => {
//     return `${IFRAME_CONFIG.BASE_URL}?token=${token}&locale=${IFRAME_CONFIG.LOCALE}&mode=${IFRAME_CONFIG.MODE}&showsearchbox=true`;
//   };
//   // URLの生成をメモ化
//   const iframeUrl = useMemo(() => {
//     const token = webToken.token ?? webToken.value;
//     return token ? getIframeUrl(token) : null;
//   }, [webToken]);

//   const initializeIframe = useCallback(() => {
//     if (!containerRef.current || !iframeUrl) return;
//     const options = {
//       url: iframeUrl,
//       where: containerRef.current,
//       attributes: IFRAME_CONFIG.IFRAME_STYLE,
//     };

//     try {
//       const iframe = window.gapi.iframes.getContext().openChild(options);
//       iframeInitializedRef.current = true;

//       const handleProductSelect = async (event: SelectEvent) => {
//         if (event.action === "selected") {
//           const appData = await getAppData(event.packageName, enterpriseName);
//           toast.success(<AppSonner appData={appData.app_details as AppData} />);
//         }
//       };
//       iframe.register(
//         "onproductselect",
//         handleProductSelect,
//         window.gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
//       );
//     } catch (error) {
//       console.error("Failed to initialize iframe:", error);
//       toast.error("iFrameの初期化に失敗しました");
//     }
//   }, [iframeUrl, enterpriseName]);

//   useEffect(() => {
//     if (window.gapi && !iframeInitializedRef.current) {
//       window.gapi.load("gapi.iframes", initializeIframe);
//     }

//     // クリーンアップ関数
//     return () => {
//       iframeInitializedRef.current = false;
//     };
//   }, [initializeIframe]);

//   return (
//     <>
//       <Script
//         src="https://apis.google.com/js/api.js"
//         strategy="afterInteractive"
//         onLoad={() => {
//           if (window.gapi) {
//             window.gapi.load("gapi.iframes", initializeIframe);
//           }
//         }}
//       />
//       <div
//         ref={containerRef}
//         className="w-full h-full relative"
//         // iframeのコンテナにフォールバック表示を追加
//         aria-label="Google Play Console Embed"
//         role="region"
//       />
//     </>
//   );
// }
