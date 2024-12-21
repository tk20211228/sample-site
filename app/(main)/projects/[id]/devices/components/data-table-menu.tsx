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
  Smartphone,
  Trash2,
  Vibrate,
  VibrateOffIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

import { DeviceConfigData, DeviceTableType } from "@/app/(main)/types/device";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Row } from "@tanstack/react-table";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  startLostModeSelectedDevice,
  stopLostModeSelectedDevice,
} from "../actions/lost-mode-devices copy";
import { fetchDeviceInfoFromDB, syncDeviceInfoFromDB } from "../data/device";

interface DataTableMenuProps {
  row: Row<DeviceTableType>;
  // column: Column<DeviceTable>;
}

export default function DataTableMenu({ row }: DataTableMenuProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [initializationOption, setInitializationOption] = useState("");
  const [device, setDevice] = useState<DeviceConfigData>();
  const [isLostMode, setIsLostMode] = useState(false);
  const params = useParams();
  const enterpriseId = params.id as string;
  // デバイス情報を正しく取得
  // const device = row.original.device_config_data;

  // const onClick = async () => {
  //   console.log(parent);
  // setQrCode(null);
  // const qrData = await createEnrollmentToken(parent);
  // console.log("qrData", qrData);
  // if (qrData) {
  // setQrCode(qrData);
  // setQrCode(`http://192.168.10.117:3000/api/emm/qr?parent=${parent}`);
  // setQrCode(`https://enterprise.google.com/android/enroll?et=${qrData}`);
  // }
  // };

  const handleDeviceInfo = async (columnId: string) => {
    console.log(columnId);
    const device = await fetchDeviceInfoFromDB(columnId);
    setDevice(device);
    setIsDetailsDialogOpen(true);
    console.log(columnId);
  };

  const handleSyncDeviceInfo = async (deviceName: string) => {
    console.log(deviceName);
    if (!enterpriseId) {
      toast.error("企業IDが取得できませんでした。");
      return;
    }
    await syncDeviceInfoFromDB(deviceName, enterpriseId).catch((error) => {
      toast.error("デバイス情報の取得に失敗しました。");
      console.error("デバイス情報の取得に失敗しました。", error);
    });
  };

  const handleDeviceAction = async (action: string) => {
    console.log(action);
  };

  const handleStartLostMode = async (deviceName: string) => {
    await startLostModeSelectedDevice(deviceName).then(() => {
      toast.success("紛失モードを有効にしました");
      setIsLostMode(true);
    });
  };

  const handleStopLostMode = async (deviceName: string) => {
    await stopLostModeSelectedDevice(deviceName).then(() => {
      toast.success("紛失モードを無効にしました");
      setIsLostMode(false);
    });
  };

  // const handleDeviceReset = async (action: string) => {
  //   console.log(action);
  // };

  // const handleDeviceDelete = async (action: string) => {
  //   console.log(action);
  // };

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
          <DropdownMenuItem onSelect={() => handleDeviceInfo(row.original.id)}>
            <Smartphone className="mr-4 h-4 w-4" />
            <span>デバイス詳細</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleSyncDeviceInfo(row.original.device_name)}
          >
            <Download className="mr-4 h-4 w-4" />
            <span>デバイス情報取得</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDeviceAction(row.original.device_name)}
          >
            <Lock className="mr-4 h-4 w-4" />
            <span>リモートロック</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDeviceAction(row.original.device_name)}
          >
            <Key className="mr-4 h-4 w-4" />
            <span>パスワードリセット</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDeviceAction(row.original.device_name)}
          >
            <RefreshCw className="mr-4 h-4 w-4" />
            <span>端末再起動</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDeviceAction(row.original.device_name)}
          >
            <CaptionsOff className="mr-4 h-4 w-4" />
            <span>アプリデータ削除</span>
          </DropdownMenuItem>
          {isLostMode ? (
            <DropdownMenuItem
              onSelect={() => handleStopLostMode(row.original.device_name)}
            >
              <VibrateOffIcon className="mr-4 h-4 w-4" />
              <span>紛失モード停止</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onSelect={() => handleStartLostMode(row.original.device_name)}
            >
              <Vibrate className="mr-4 h-4 w-4" />
              <span>紛失モード</span>
            </DropdownMenuItem>
          )}
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
              <p>API Level: {device?.apiLevel ?? "不明"}</p>
              <p>管理モード: {device?.managementMode ?? "不明"}</p>
              <p>所有権: {device?.ownership ?? "不明"}</p>
              <p>状態: {device?.state ?? "不明"}</p>
              <p>ポリシー準拠: {device?.policyCompliant ? "はい" : "いいえ"}</p>
            </div>
            <div>
              <h3 className="font-semibold">ハードウェア情報</h3>
              <p>ブランド: {device?.hardwareInfo?.brand ?? "不明"}</p>
              <p>製造元: {device?.hardwareInfo?.manufacturer ?? "不明"}</p>
              <p>モデル: {device?.hardwareInfo?.model ?? "不明"}</p>
              <p>
                シリアル番号: {device?.hardwareInfo?.serialNumber ?? "不明"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">メモリ情報</h3>
              <p>
                内部ストレージ:{" "}
                {(
                  parseInt(device?.memoryInfo?.totalInternalStorage ?? "0") /
                  (1024 * 1024 * 1024)
                ).toFixed(2)}{" "}
                GB
              </p>
              <p>
                RAM:{" "}
                {(
                  parseInt(device?.memoryInfo?.totalRam ?? "0") /
                  (1024 * 1024 * 1024)
                ).toFixed(2)}{" "}
                GB
              </p>
            </div>
            <div>
              <h3 className="font-semibold">ポリシー情報</h3>
              <p>
                適用ポリシー名:{" "}
                {device?.appliedPolicyName?.split("/").pop() ?? "不明"}
              </p>
              <p>
                ポリシーバージョン: {device?.appliedPolicyVersion ?? "不明"}
              </p>
              <p>
                最終同期:{" "}
                {device?.lastPolicySyncTime
                  ? new Date(device?.lastPolicySyncTime).toLocaleString("ja-JP")
                  : "不明"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">セキュリティ情報</h3>
              <p>
                デバイスの姿勢:{" "}
                {device?.securityPosture?.devicePosture ?? "不明"}
              </p>
            </div>
            <div>
              <h3 className="font-semibold">その他</h3>
              <p>
                登録日時:{" "}
                {device?.enrollmentTime
                  ? new Date(device?.enrollmentTime).toLocaleString("ja-JP")
                  : "不明"}
              </p>
              <p>
                最終ステータス報告:{" "}
                {device?.lastStatusReportTime
                  ? new Date(device?.lastStatusReportTime).toLocaleString(
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

/**
 * // デバイスアクションの実装
  const handleDeviceAction = async (action: string) => {
    try {
      const deviceName = device.name;
      
      switch (action) {
        case "lock":
          // リモートロックの実装
          console.log("Locking device:", deviceName);
          break;
        case "reset":
          // パスワードリセットの実装
          console.log("Resetting password for device:", deviceName);
          break;
        case "reboot":
          // 再起動の実装
          console.log("Rebooting device:", deviceName);
          break;
        // ... 他のアクション
      }
    } catch (error) {
      console.error("Device action failed:", error);
      // エラー処理を追加
    }
  };

  // ... 既存のJSXコード ...

  // メニュー項目のクリックハンドラーを更新
  <DropdownMenuItem onClick={() => handleDeviceAction("lock")}>
    <Lock className="mr-4 h-4 w-4" />
    <span>リモートロック</span>
  </DropdownMenuItem>
 */
