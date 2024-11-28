// "use client";

// import { useEffect, useRef, useState } from "react";

// type WebTokenType = { token?: string | null; value?: string | null };

// export default function EmmConsoleNext({
//   webToken,
// }: {
//   webToken: WebTokenType;
//   onDragStart?: (url: string) => void;
// }) {
//   const [isIframeLoaded, setIsIframeLoaded] = useState(false);
//   const iframeRef = useRef<HTMLIFrameElement>(null);

//   useEffect(() => {
//     if (!isIframeLoaded || !iframeRef.current) return;

//     const handleIframeLoad = () => {
//       try {
//         // iFrameのcontentDocumentにイベントリスナーを追加
//         const iframeDocument = iframeRef.current?.contentDocument;
//         if (iframeDocument) {
//           iframeDocument.addEventListener("dragstart", (e) => {
//             console.log("iFrame Drag Event:", e);
//             console.log("Dragged Element:", e.target);
//           });
//         }
//       } catch (error) {
//         console.warn("iFrameアクセスエラー:", error);
//         // Same-Origin Policyによるエラーの可能性があります
//       }
//     };

//     // iFrameのロード完了時にイベントリスナーを設定
//     iframeRef.current.addEventListener("load", handleIframeLoad);

//     return () => {
//       iframeRef.current?.removeEventListener("load", handleIframeLoad);
//     };
//   }, [isIframeLoaded]);

//   const token = webToken.token ?? webToken.value;

//   return (
//     <iframe
//       ref={iframeRef}
//       src={`https://play.google.com/work/embedded/search?token=${token}&mode=APPROVE&showsearchbox=TRUE`}
//       className="w-full h-full"
//       onLoad={() => setIsIframeLoaded(true)}
//     />
//   );
// }
