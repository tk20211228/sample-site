"use client";

import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { Loader2Icon, Trash2Icon } from "lucide-react";

import { useTransition } from "react";
import { toast } from "sonner";

import { deleteSelectedDevices } from "../actions/delete-devices";
import { useDevices } from "../../apps/data/use-devices";
import { useEnterprise } from "../../providers/enterprise";

interface DeleteSelectedDevicesButtonProps<TData> {
  table: Table<TData>;
}

export default function DeleteSelectedDevicesButton<TData>({
  table,
}: DeleteSelectedDevicesButtonProps<TData>) {
  const { enterpriseName } = useEnterprise();
  const key = "/api/devices";
  const { mutate } = useDevices(key, enterpriseName);
  const [isPending, startTransition] = useTransition();
  const handleDeleteApps = async () => {
    const deleteDeviceNameList = table.getSelectedRowModel().rows.map((row) => {
      return row.getValue("device_name") as string;
    });
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await deleteSelectedDevices(deleteDeviceNameList)
        .then(async () => {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          toast.success("選択したデバイスを削除しました。");
          mutate?.((currentData) => {
            return currentData?.filter(
              (device) => !deleteDeviceNameList.includes(device.device_name)
            );
          });
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
