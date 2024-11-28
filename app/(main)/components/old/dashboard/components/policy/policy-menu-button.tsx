// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { androidmanagement_v1 } from "googleapis";
// import { EllipsisIcon, FileText, Pencil, Trash2 } from "lucide-react";
// import { useState } from "react";

// export default function PolicyMenuButton({
//   policy,
// }: {
//   policy: androidmanagement_v1.Schema$Policy;
// }) {
//   const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

//   return (
//     <div>
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" size="icon">
//             <EllipsisIcon className="h-4 w-4" />
//             <span className="sr-only">メニューを開く</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="space-y-1 px-2" align="end">
//           <DropdownMenuItem onSelect={() => setIsDetailsDialogOpen(true)}>
//             <FileText className="mr-4 h-4 w-4" />
//             <span>ポリシー詳細</span>
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <Pencil className="mr-4 h-4 w-4" />
//             <span>編集</span>
//           </DropdownMenuItem>
//           <DropdownMenuItem>
//             <Trash2 className="mr-4 h-4 w-4" />
//             <span className="text-red-500">削除</span>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>

//       <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
//         <DialogContent className="max-w-3xl">
//           <DialogHeader>
//             <DialogTitle>ポリシー詳細</DialogTitle>
//           </DialogHeader>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <h3 className="font-semibold">基本情報</h3>
//               <p>ポリシー名: {policy.name?.split("/").pop() ?? "不明"}</p>
//               <p>バージョン: {policy.version ?? "不明"}</p>
//             </div>
//             <div>
//               <h3 className="font-semibold">アプリケーション設定</h3>
//               <p>
//                 Play ストアモード:{" "}
//                 {policy.playStoreMode === "BLACKLIST"
//                   ? "ブラックリスト"
//                   : "ホワイトリスト"}
//               </p>
//             </div>
//             <div>
//               <h3 className="font-semibold">デバイス設定</h3>
//               <p>
//                 カメラ:{" "}
//                 {policy.cameraAccess === "CAMERA_ACCESS_UNSPECIFIED"
//                   ? "未設定"
//                   : policy.cameraAccess === "CAMERA_ACCESS_USER_CHOICE"
//                   ? "有効"
//                   : "無効"}
//               </p>
//               <p>
//                 スクリーンキャプチャ:{" "}
//                 {policy.screenCaptureDisabled ? "無効" : "有効"}
//               </p>
//               <p>
//                 位置情報:{" "}
//                 {policy.locationMode === "LOCATION_ENFORCED"
//                   ? "強制有効"
//                   : "未設定"}
//               </p>
//             </div>
//             <div>
//               <h3 className="font-semibold">セキュリティ設定</h3>
//               <p>
//                 デバイスパスワード要件:{" "}
//                 {policy.passwordRequirements ? "設定あり" : "デフォルト設定"}
//               </p>
//             </div>
//             <div>
//               <h3 className="font-semibold">開発者設定</h3>
//               <p>
//                 高度なセキュリティ設定:{" "}
//                 {policy.advancedSecurityOverrides ? "カスタム" : "デフォルト"}
//               </p>
//               <p>
//                 開発者オプション:{" "}
//                 {policy.advancedSecurityOverrides?.developerSettings ===
//                 "DEVELOPER_SETTINGS_ALLOWED"
//                   ? "許可"
//                   : "不許可"}
//               </p>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button onClick={() => setIsDetailsDialogOpen(false)}>
//               閉じる
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
