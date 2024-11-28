// "use client";

// import { Button } from "@/components/ui/button";
// // import { androidmanagement_v1 } from "googleapis";
// import { getAndroidEnterpriseWebToken } from "@/actions/emm/get-webtoken";
// import { Loader2Icon } from "lucide-react";
// import { Suspense, useState, useTransition } from "react";
// import { useEnterprise } from "../../providers/enterprise";
// import EmmConsole from "./old/emm-console";
// // import EmmConsoleNext from "./emm-console-next";

// type WebTokenType = { token?: string | null; value?: string | null };

// export default function AppsIframe() {
//   const [isPending, startTransition] = useTransition();
//   const [webToken, setWebToken] = useState<WebTokenType>();
//   const [selectedAppId] = useState<string>();
//   const { enterpriseName } = useEnterprise();

//   const handleClick = async () => {
//     startTransition(async () => {
//       if (enterpriseName) {
//         // const token = await getAndroidManagementWebToken(enterprisesName);
//         const token = await getAndroidEnterpriseWebToken(enterpriseName);
//         console.log(token);
//         // console.log(
//         //   `https://play.google.com/work/embedded/search?token=${token.token}&locale=ja_JP&mode=APPROVE&showsearchbox=FALSE&search=chrome`
//         // );
//         setWebToken(token);
//       }
//     });
//   };

//   // const handleAppIdReceived = (appId: string) => {
//   //   setSelectedAppId(appId);
//   //   console.log("Received App ID:", appId);
//   //   // ここで必要な処理を追加
//   // };

//   const handleIframeContainerDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     // ドラッグ中のデータを保持
//     if (e.type === "dragstart") {
//       try {
//         const selection = window.getSelection();
//         const text = selection?.toString() || "";
//         if (text.includes("play.google.com")) {
//           console.log("Dragged URL:", text);
//         }
//       } catch (err) {
//         console.log("Error getting selection:", err);
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="flex flex-row items-center gap-4 pb-2">
//         <Button
//           variant="outline"
//           className=""
//           onClick={handleClick}
//           disabled={isPending}
//         >
//           {isPending ? (
//             <>
//               <Loader2Icon className=" animate-spin" />
//               取得中...
//             </>
//           ) : (
//             "managed Google Play を開く"
//           )}
//         </Button>

//         {selectedAppId && (
//           <div className="p-4 bg-muted rounded-lg">
//             <p>選択されたアプリID: {selectedAppId}</p>
//           </div>
//         )}
//       </div>
//       <section
//         className="h-full space-y-4"
//         onDragStart={handleIframeContainerDrag}
//         onDrag={handleIframeContainerDrag}
//       >
//         {webToken && (
//           <Suspense fallback={<p>Loading ...</p>}>
//             {/* <div className="aspect-video">
//               <EmmConsoleNext webToken={webToken} />
//             </div> */}
//             <div className="h-full w-full">
//               {/* <div className="aspect-video"> */}
//               <EmmConsole
//                 webToken={webToken}
//                 enterpriseName={enterpriseName ?? ""}
//               />
//             </div>
//           </Suspense>
//         )}
//       </section>
//     </div>
//   );
// }
