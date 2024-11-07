"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSearchParams } from "next/navigation";
import CameraAccessButton from "../device/camera-access-button";

export default function PolicyTable() {
  const searchParams = useSearchParams();
  const enterprises_name = searchParams.get("enterprises_name");
  return (
    <Table>
      <TableCaption>
        <div className="flex">{enterprises_name}</div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-1/12">No.</TableHead>
          <TableHead className="w-7/12">ポリシー名</TableHead>
          <TableHead className="w-2/12">更新日</TableHead>
          <TableHead className="w-2/12">備考</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">1</TableCell>
          <TableCell>標準ポリシー</TableCell>
          <TableCell>yyyy/mm/dd/ HH:MM:SS</TableCell>
          <TableCell className="">
            {enterprises_name && (
              <CameraAccessButton parent={enterprises_name} />
            )}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
