// "use client";

// import Script from "next/script";
// import {
//   ReactNode,
//   createContext,
//   useCallback,
//   useContext,
//   useRef,
//   useState,
// } from "react";
// import { SelectEvent } from "../policies/types/gapi";
// import { getAppData } from "../apps/data/get-app-info";
// import { useEnterprise } from "./enterprise";
// import { toast } from "sonner";
// import AppSonner from "../apps/public/components/table/app-sonner";
// import { AppData } from "@/app/(main)/types/apps";
// import { useParams } from "next/navigation";
// import { androidenterprise_v1 } from "googleapis";
// import { APP_IFRAME_CONFIG } from "../apps/data/app-iframe-config";

// type ContextType = {
//   initializeIframe: (
//     data: androidenterprise_v1.Schema$AdministratorWebToken,
//     containerRef: React.RefObject<HTMLDivElement>,
//     isInitializedRef: React.MutableRefObject<boolean>
//   ) => void;
// };

// const Context = createContext<ContextType>({
//   initializeIframe: () => {},
// } as ContextType);

// declare const gapi: {
//   load: (api: string, callback: () => void) => void;
//   iframes: {
//     getContext: () => {
//       openChild: (options: {
//         url: string;
//         where: HTMLElement | null;
//         attributes: Record<string, string>;
//       }) => {
//         register: (
//           eventName: string,
//           callback: (event: SelectEvent) => void,
//           filter: unknown
//         ) => void;
//       };
//     };
//     CROSS_ORIGIN_IFRAMES_FILTER: unknown;
//   };
// };

// export function GapiIframesProvider({ children }: { children: ReactNode }) {
//   const params = useParams();
//   const enterpriseId = params.id;
//   const enterpriseName = "enterprises/" + enterpriseId;

//   const initializeIframe = useCallback(
//     (
//       data: androidenterprise_v1.Schema$AdministratorWebToken,
//       containerRef: React.RefObject<HTMLDivElement>,
//       isInitializedRef: React.MutableRefObject<boolean>
//     ) => {
//       // 既に初期化されている場合は早期リターン
//       if (isInitializedRef.current) {
//         console.log("既に初期化済みです");
//         return;
//       }
//       const token = data.token;
//       console.log("初期化を開始");
//       if (!window.gapi) return console.log("gapiが読み込まれていません");

//       // iframesモジュールを明示的に読み込む
//       gapi.load("iframes", () => {
//         const iframeUrl = `${APP_IFRAME_CONFIG.BASE_URL}?token=${token}&locale=${APP_IFRAME_CONFIG.LOCALE}&mode=${APP_IFRAME_CONFIG.MODE}&showsearchbox=true`;
//         if (!containerRef || !iframeUrl) {
//           console.log("iframeのコンテナが読み込まれていません");
//           return;
//         }

//         // const iframeUrl = `${APP_IFRAME_CONFIG.BASE_URL}?token=${token}&locale=${APP_IFRAME_CONFIG.LOCALE}&mode=${APP_IFRAME_CONFIG.MODE}&showsearchbox=true`;
//         // if (!containerRef || !iframeUrl)
//         //   return console.log("iframeのコンテナが読み込まれていません");
//         // console.log("iframeのコンテナが読み込まれています");

//         try {
//           const options = {
//             url: iframeUrl,
//             where: containerRef.current,
//             attributes: APP_IFRAME_CONFIG.IFRAME_STYLE,
//           };
//           const iframe = gapi.iframes.getContext().openChild(options);
//           isInitializedRef.current = true;

//           const handleProductSelect = async (event: SelectEvent) => {
//             if (event.action === "selected") {
//               const appData = await getAppData(
//                 event.packageName,
//                 enterpriseName
//               );
//               toast.success(
//                 <AppSonner appData={appData.app_details as AppData} />
//               );
//             }
//           };

//           iframe.register(
//             "onproductselect",
//             handleProductSelect,
//             gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER
//           );
//           console.log("iframeの初期化に成功");
//         } catch (error) {
//           console.error("Failed to initialize iframe:", error);
//           toast.error("iFrameの初期化に失敗しました");
//         }
//       });
//     },
//     [enterpriseName]
//   );

//   return (
//     <Context.Provider value={{ initializeIframe }}>
//       {children}
//       <Script
//         src="https://apis.google.com/js/api.js"
//         strategy="beforeInteractive"
//         onLoad={() => {
//           console.log("gapi loaded");
//         }}
//       />
//     </Context.Provider>
//   );
// }

// export const useGapiIframes = () => useContext(Context);
