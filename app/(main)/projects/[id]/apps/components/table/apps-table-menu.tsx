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
import {
  Download,
  EllipsisIcon,
  ExternalLinkIcon,
  FileTextIcon,
  Loader2Icon,
  Trash2,
} from "lucide-react";

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
import { AppsTableType } from "@/app/(main)/types/apps";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppsInfoSheet } from "../../../providers/apps-info-sheet";
import { usePublicApps } from "../../../providers/public-apps";
import { deleteApp } from "../../actions/delete-app";

interface DataTableMenuProps {
  row: Row<AppsTableType>;
  className?: string;
}

export default function AppsTableMenu({ row, className }: DataTableMenuProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { publicAppsTableData, setPublicAppsTableData } = usePublicApps();
  const { isPending } = useAppsInfoSheet();
  const router = useRouter();
  const pathName = usePathname();
  const handleViewInfo = () => {
    router.push(`${pathName}?id=${row.original.name}`);
  };

  const handleExternalLink = () => {
    const url = row.original.playStoreUrl;
    window.open(url, "_blank");
  };
  const handleDownload = async () => {
    window.location.href = `/api/download?name=${row.original.name}`;
    console.log(`/api/download?name=${row.original.name}`);
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
  // appDate.author に”Private”が含まれている場合は、アプリの種別を”PRIVATE”とする
  // appDate.author に”Web”が含まれている場合は、アプリの種別を”WEB”とする
  // 上記以外は、アプリの種別を”PUBLIC”とする
  // const appType = appData.author?.includes("Private")
  //   ? "PRIVATE"
  //   : appData.author?.includes("Web")
  //   ? "WEB"
  //   : "PUBLIC";

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
          <DropdownMenuItem onSelect={handleViewInfo} disabled={isPending}>
            {isPending ? (
              <div className="flex items-center">
                <Loader2Icon className="mr-4 h-4 w-4 animate-spin" />
                <span>読み込み中...</span>
              </div>
            ) : (
              <>
                <FileTextIcon className="mr-4 h-4 w-4" />
                <span>アプリ詳細 を開く</span>
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleExternalLink}>
            <ExternalLinkIcon className="mr-4 h-4 w-4" />
            <span>Play Store を開く</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDownload}>
            <Download className="mr-4 h-4 w-4" />
            <span>アプリ情報をダウンロード</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
            <Trash2 className="mr-4 h-4 w-4 text-red-500" />
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
