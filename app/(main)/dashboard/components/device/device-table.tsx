"use client";

import { getDevices } from "@/app/(main)/device/data/device";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { androidmanagement_v1 } from "googleapis";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import CreateQrButton from "./create-qr-button";
import MenuButton from "./menu-button";
import Link from "next/link";

type Device = androidmanagement_v1.Schema$Device;

export default function DeviceTable() {
  const [isPending, startTransition] = useTransition();
  const [devices, setDevices] = useState<Device[]>([]);
  const searchParams = useSearchParams();
  const enterprises_name = searchParams.get("enterprises_name");

  const handleClick = async () => {
    startTransition(async () => {
      if (enterprises_name) {
        const data = await getDevices(enterprises_name);
        console.log(devices);
        setDevices(data.devices || []);
      }
    });
  };

  return (
    <div>
      <div className="flex flex-row gap-2 border-b-2 border-gray-200 pb-2">
        <Button
          variant="outline"
          className="w-40"
          onClick={handleClick}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className=" animate-spin" />
              取得中...
            </>
          ) : (
            "デバイス一覧を取得"
          )}
        </Button>
        {enterprises_name && <CreateQrButton parent={enterprises_name} />}
        <Button variant="outline" className="" asChild>
          <Link href="/sample">サンプルテーブル</Link>
        </Button>
        <Button variant="outline" className="" asChild>
          <Link href={`/device?enterprises_name=${enterprises_name}`}>
            デバイステーブル
          </Link>
        </Button>
      </div>
      <Table>
        <TableCaption>
          <div className="flex">{enterprises_name}</div>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/12">No.</TableHead>
            <TableHead className="w-1/12">ステータス</TableHead>
            <TableHead className="w-6/12">端末名</TableHead>
            <TableHead className="w-2/12">更新日</TableHead>
            <TableHead className="w-2/12 ">アイテム</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {devices.map((device, index) => (
            <TableRow key={device.name}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{device.state || "未設定"}</TableCell>
              <TableCell>{device.name || "不明"}</TableCell>
              <TableCell>
                {device.lastStatusReportTime
                  ? new Date(device.lastStatusReportTime).toLocaleString(
                      "ja-JP"
                    )
                  : "不明"}
              </TableCell>
              <TableCell className="flex justify-end">
                {enterprises_name && (
                  <MenuButton parent={enterprises_name} device={device} />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
