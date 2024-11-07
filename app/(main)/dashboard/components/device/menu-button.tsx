"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CaptionsOff,
  Download,
  EllipsisIcon,
  Key,
  Lock,
  RefreshCw,
  Search,
  Smartphone,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { androidmanagement_v1 } from "googleapis";

export default function MenuButton({
  parent,
  device,
}: {
  parent: string;
  device: androidmanagement_v1.Schema$Device;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [initializationOption, setInitializationOption] = useState("");

  // const deviceDetails = {
  //   apiLevel: 31,
  //   appliedPolicyName: "enterprises/LC0283n6ru/policies/first-policy",
  //   appliedPolicyVersion: "8",
  //   appliedState: "ACTIVE",
  //   enrollmentTime: "2024-11-06T10:59:23.515Z",
  //   enrollmentTokenName:
  //     "enterprises/LC0283n6ru/enrollmentTokens/1W-LgHgGEQL798qbrR9Ntcph9QxhGQX6b74apgoJLJA",
  //   hardwareInfo: {
  //     brand: "Redmi",
  //     deviceBasebandVersion: "MPSS.HI.4.0.5.c3-00025-MANNAR_GEN_PACK-1",
  //     hardware: "qcom",
  //     manufacturer: "Xiaomi",
  //     model: "XIG02",
  //     serialNumber: "91a34fc90121",
  //   },
  //   lastPolicySyncTime: "2024-11-07T00:52:43.694Z",
  //   lastStatusReportTime: "2024-11-06T12:54:33.715Z",
  //   managementMode: "DEVICE_OWNER",
  //   memoryInfo: {
  //     totalInternalStorage: "2913284096",
  //     totalRam: "3634114560",
  //   },
  //   name: "enterprises/LC0283n6ru/devices/32a2dcff8061070f",
  //   ownership: "COMPANY_OWNED",
  //   policyCompliant: true,
  //   policyName: "enterprises/LC0283n6ru/policies/first-policy",
  //   securityPosture: {
  //     devicePosture: "SECURE",
  //   },
  //   state: "ACTIVE",
  //   userName: "enterprises/LC0283n6ru/users/106882746189117267782",
  // };

  const onClick = async () => {
    console.log(parent);
    // setQrCode(null);
    // const qrData = await createEnrollmentToken(parent);
    // console.log("qrData", qrData);
    // if (qrData) {
    // setQrCode(qrData);
    // setQrCode(`http://192.168.10.117:3000/api/emm/qr?parent=${parent}`);
    // setQrCode(`https://enterprise.google.com/android/enroll?et=${qrData}`);
    // }
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <EllipsisIcon className="h-4 w-4" />
            <span className="sr-only">メニューを開く</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" space-y-1 px-2" align="end">
          <DropdownMenuItem onSelect={() => setIsDetailsDialogOpen(true)}>
            <Smartphone className="mr-4 h-4 w-4" />
            <span>デバイス詳細</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onClick}>
            <Download className="mr-4 h-4 w-4" />
            <span>デバイス情報取得</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Lock className="mr-4 h-4 w-4" />
            <span>リモートロック</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Key className="mr-4 h-4 w-4" />
            <span>パスワードリセット</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RefreshCw className="mr-4 h-4 w-4" />
            <span>端末再起動</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CaptionsOff className="mr-4 h-4 w-4" />
            <span>アプリデータ削除</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Search className="mr-4 h-4 w-4" />
            <span>紛失モード</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
            <Trash2 className="mr-4 h-4 w-4" />
            <span className="text-red-500">端末初期化</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              本当に初期化してもよろしいでしょうか？
            </AlertDialogTitle>
            <AlertDialogDescription>
              初期化のオプションを選択してください。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <RadioGroup
            value={initializationOption}
            onValueChange={setInitializationOption}
            className="space-y-1"
          >
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="option1" id="option1" />
              <Label htmlFor="option1">
                デバイスプロテクションを解除し初期化
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="option2" id="option2" />
              <Label htmlFor="option2">
                デバイスプロテクションを解除し初期化（外部ストレージも削除）
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <RadioGroupItem value="option3" id="option3" />
              <Label htmlFor="option3">
                デバイスプロテクション有効を維持し初期化
              </Label>
            </div>
          </RadioGroup>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction disabled={!initializationOption}>
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>デバイス詳細</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">基本情報</h3>
              <p>API Level: {device.apiLevel ?? "不明"}</p>
              <p>管理モード: {device.managementMode ?? "不明"}</p>
              <p>所有権: {device.ownership ?? "不明"}</p>
              <p>状態: {device.state ?? "不明"}</p>
              <p>ポリシー準拠: {device.policyCompliant ? "はい" : "いいえ"}</p>
            </div>
            <div>
              <h3 className="font-semibold">ハードウェア情報</h3>
              <p>ブランド: {device.hardwareInfo?.brand ?? "不明"}</p>
              <p>製造元: {device.hardwareInfo?.manufacturer ?? "不明"}</p>
              <p>モデル: {device.hardwareInfo?.model ?? "不明"}</p>
              <p>シリアル番号: {device.hardwareInfo?.serialNumber ?? "不明"}</p>
            </div>
            <div>
              <h3 className="font-semibold">メモリ情報</h3>
              <p>
                内部ストレージ:{" "}
                {(
                  parseInt(device.memoryInfo?.totalInternalStorage ?? "0") /
                  (1024 * 1024 * 1024)
                ).toFixed(2)}{" "}
                GB
              </p>
              <p>
                RAM:{" "}
                {(
                  parseInt(device.memoryInfo?.totalRam ?? "0") /
                  (1024 * 1024 * 1024)
                ).toFixed(2)}{" "}
                GB
              </p>
            </div>
            <div>
              <h3 className="font-semibold">ポリシー情報</h3>
              <p>
                適用ポリシー名:{" "}
                {device.appliedPolicyName?.split("/").pop() ?? "不明"}
              </p>
              <p>ポリシーバージョン: {device.appliedPolicyVersion ?? "不明"}</p>
              <p>
                最終同期:{" "}
                {device.lastPolicySyncTime
                  ? new Date(device.lastPolicySyncTime).toLocaleString("ja-JP")
                  : "不明"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">セキュリティ情報</h3>
              <p>
                デバイスの姿勢:{" "}
                {device.securityPosture?.devicePosture ?? "不明"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">その他</h3>
              <p>
                登録日時:{" "}
                {device.enrollmentTime
                  ? new Date(device.enrollmentTime).toLocaleString("ja-JP")
                  : "不明"}
              </p>
              <p>
                最終ステータス報告:{" "}
                {device.lastStatusReportTime
                  ? new Date(device.lastStatusReportTime).toLocaleString(
                      "ja-JP"
                    )
                  : "不明"}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsDetailsDialogOpen(false)}>
              閉じる
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
