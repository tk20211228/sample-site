"use client";

import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteSelectedDevices } from "../actions/delete-devices";
import { useParams } from "next/navigation";

interface DeleteSelectedDevicesButtonProps<TData> {
  table: Table<TData>;
}

export default function DeleteSelectedDevicesButton<TData>({
  table,
}: DeleteSelectedDevicesButtonProps<TData>) {
  const params = useParams();
  const enterpriseId = params.id as string;
  const [isPending, startTransition] = useTransition();
  const handleDeleteApps = async () => {
    const deleteDeviceNameList = table.getSelectedRowModel().rows.map((row) => {
      return row.getValue("device_name") as string;
    });
    startTransition(async () => {
      await deleteSelectedDevices(deleteDeviceNameList, enterpriseId)
        .then(async () => {
          toast.success("選択したデバイスを削除しました。");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  };

  return (
    <Button
      variant="outline"
      className="h-8"
      onClick={handleDeleteApps}
      disabled={isPending}
      size="icon"
    >
      {isPending ? (
        <>
          <Loader2Icon className="size-4 animate-spin" />
          <span className="sr-only">選択したアプリを削除中</span>
        </>
      ) : (
        <>
          <Trash2Icon className="size-4 text-red-500" />
          <span className="sr-only">選択したアプリを削除</span>
        </>
      )}
    </Button>
  );
}
