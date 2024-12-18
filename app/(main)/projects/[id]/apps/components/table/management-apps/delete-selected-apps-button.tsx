"use client";

import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { Loader2Icon, Trash2Icon } from "lucide-react";

import { useTransition } from "react";
import { toast } from "sonner";
import { useEnterprise } from "../../../../providers/enterprise";
import { deleteSelectedApps } from "../../../actions/delete-app";
import { useApps } from "../../../data/use-apps";

interface DeleteSelectedAppsButtonProps<TData> {
  table: Table<TData>;
}

export default function DeleteSelectedAppsButton<TData>({
  table,
}: DeleteSelectedAppsButtonProps<TData>) {
  const { enterpriseName } = useEnterprise();
  const key = "/api/apps";
  const { mutate } = useApps(key, enterpriseName);
  const [isPending, startTransition] = useTransition();
  const handleDeleteApps = async () => {
    const deleteAppNameList = table.getSelectedRowModel().rows.map((row) => {
      return row.getValue("name") as string;
    });
    startTransition(async () => {
      await deleteSelectedApps(deleteAppNameList)
        .then(async () => {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          toast.success("選択したアプリ情報を削除しました。");
          mutate?.((currentData) => {
            return currentData?.filter(
              (app) => !deleteAppNameList.includes(app.name)
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
