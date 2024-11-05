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
import CreateQrButton from "./create-qr-button";

export default function DeviceTable({ parent }: { parent: string | null }) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No.</TableHead>
          <TableHead>ステータス</TableHead>
          <TableHead>端末名</TableHead>
          <TableHead className="">アイテム</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">1</TableCell>
          <TableCell>未設定</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="">
            {parent && <CreateQrButton parent={parent} />}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
