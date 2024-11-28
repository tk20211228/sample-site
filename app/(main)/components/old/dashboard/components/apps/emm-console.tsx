// "use client";

// import { useEffect, useRef } from "react";
// import Script from "next/script";
// import { getAppData } from "@/actions/emm/get-app-data";

// declare global {
//   interface Window {
//     gapi: {
//       load: (api: string, callback: () => void) => void;
//       iframes: {
//         getContext: () => {
//           openChild: (options: {
//             url: string;
//             where: HTMLElement;
//             attributes: {
//               style: string;
//               scrolling: string;
//             };
//           }) => {
//             register: (
//               eventName: string,
//               callback: (event: any) => void,
//               filter: string
//             ) => void;
//           };
//         };
//         CROSS_ORIGIN_IFRAMES_FILTER: string;
//       };
//     };
//   }
// }

// type WebTokenType = { token?: string | null; value?: string | null };

// export default function EmmConsole({
//   webToken,
//   enterprisesName,
// }: {
//   webToken: WebTokenType;
//   enterprisesName: string;
// }) {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const iframeInitializedRef = useRef(false);
//   const token = webToken.token ?? webToken.value;

//   const initializeIframe = async () => {
//     if (!containerRef.current) return;

//     const options = {
//       // url: `https://play.google.com/work/embedded/search?token=${token}&locale=ja_JP&mode=APPROVE&showsearchbox=FALSE&search=chrome`,
//       url: `https://play.google.com/work/embedded/search?token=${token}&locale=ja_JP&mode=APPROVE&showsearchbox=true`,
//       where: containerRef.current,
//       attributes: {
//         style: "width: 100%; height: 100%;",
//         scrolling: "yes",
//         /**
//          * allow-same-origin: 同一オリジンのリソースへのアクセスを許可
//          * allow-scripts: スクリプトの実行を許可
//          * allow-forms: フォームの送信を許可
//          * allow-popups: ポップアップウィンドウを許可
//          * allow-popups-to-escape-sandbox: ポップアップが親のサンドボックス制限を継承しないことを許可
//          */
//         // sandbox: "allow-same-origin allow-scripts",
//         // importance: "high", //
//       },
//     };
//     try {
//       const iframe = window.gapi.iframes.getContext().openChild(options);
//       iframeInitializedRef.current = true;

//       iframe.register(
//         "onproductselect",
//         async function (event) {
//           console.log(event);
//           /**
//            * {productId: 'app:com.android.chrome', packageName: 'com.android.chrome', action: 'selected'}
//            */
//           if (event.action === "selected") {
//             // alert(`選択したアプリのpackageName: ${event.packageName}`);
//             const appData = await getAppData(
//               event.packageName,
//               enterprisesName
//             );
//             console.log(appData);
//             window.open(`${appData.smallIconUrl}`, "_blank");
//           }
//         },
//         window.gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
//       );
//     } catch (error) {
//       console.error("Failed to initialize iframe:", error);
//       iframeInitializedRef.current = true;
//     }
//   };

//   useEffect(() => {
//     if (window.gapi && !iframeInitializedRef.current) {
//       window.gapi.load("gapi.iframes", initializeIframe);
//     }
//     // クリーンアップ関数
//     return () => {
//       iframeInitializedRef.current = false;
//     };
//   }, [token]);

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
//         className="w-full h-full min-h-[600px] relative"
//         // iframeのコンテナにフォールバック表示を追加
//         aria-label="Google Play Console Embed"
//         role="region"
//       />
//     </>
//   );
// }
