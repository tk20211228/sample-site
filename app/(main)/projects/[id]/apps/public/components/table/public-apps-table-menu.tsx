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
import { Download, EllipsisIcon, PenBoxIcon, Trash2 } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

import { Row } from "@tanstack/react-table";
// import { PolicyTableType } from "../../types/policy";
// import { deletePolicy } from "../../actions/delete-policy";
// import { usePolicy } from "../../../providers/policy";

// import { editPolicy } from "../../actions/edit-policy";
import { PublicAppsTableType } from "@/app/(main)/types/apps";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { usePublicApps } from "../../../../providers/public-apps";
import { deleteApp } from "../../../actions/delete-app";

interface DataTableMenuProps {
  row: Row<PublicAppsTableType>;
  className?: string;
}

export default function PublicAppsTableMenu({
  row,
  className,
}: DataTableMenuProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { publicAppsTableData, setPublicAppsTableData } = usePublicApps();
  // const { enterpriseName, enterpriseId } = useEnterprise();
  // const router = useRouter();

  const onClick = async () => {
    console.log(parent);
  };
  const handleDelete = async () => {
    await deleteApp(row.original.name)
      .then(() => {
        toast.success("アプリを削除しました。");
        const newData = publicAppsTableData.filter(
          (p) => p.name !== row.original.name
        );
        setPublicAppsTableData(newData);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // const handleEditPolicy = async () => {
  //   const data = await editPolicy(row.original.policy_name);
  //   if (!data) return;
  //   const displayName = row.original.display_name ?? "";
  //   const policyConfigData = data.policy_config_data;
  //   const parsed = editPolicyFormSchema.parse(policyConfigData);
  //   parsed.displayName = displayName;
  //   setCurrentCreatePolicy(parsed);
  //   router.push(`/projects/${enterpriseId}/policies/general`);
  // };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className={cn("h-8", className)}>
            <EllipsisIcon className="h-4 w-4" />
            <span className="sr-only">メニューを開く</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" space-y-1 px-2" align="end">
          <DropdownMenuItem onSelect={() => {}}>
            <PenBoxIcon className="mr-4 h-4 w-4" />
            <span>アプリ詳細を確認</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => {}}>
            <PenBoxIcon className="mr-4 h-4 w-4" />
            <span>Play Storeで詳細を確認</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onClick}>
            <Download className="mr-4 h-4 w-4" />
            <span>アプリ情報をダウンロード</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
            <Trash2 className="mr-4 h-4 w-4" />
            <span className="text-red-500">削除</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              本当に削除してもよろしいでしょうか？
            </AlertDialogTitle>
            <AlertDialogDescription>
              アプリ情報を削除しても、配信されているアプリはアンインストールされません。
              次回のポリシー更新時には、自動的にアンインストールされます。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
