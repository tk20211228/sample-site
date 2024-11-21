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
  PenBoxIcon,
  RefreshCw,
  Trash2,
  UploadIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

import { Row } from "@tanstack/react-table";
import { PoliciesDbTableSchema } from "../../types/policy";
import { deletePolicy } from "../../actions/delete-policy";

interface DataTableMenuProps<TData, TValue> {
  row: Row<PoliciesDbTableSchema>;
}

export default function PoliciesTableMenu<TData, TValue>({
  row,
}: DataTableMenuProps<TData, TValue>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onClick = async () => {
    console.log(parent);
  };
  const onClickDelete = async () => {
    console.log(row.original.policy_name);
    if (row.original.policy_name === "デフォルトポリシー") {
      alert("デフォルトポリシーは削除できません。");
      return;
    }
    const res = await deletePolicy(row.original.policy_name);
    alert("削除しました。");
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
          <DropdownMenuItem onSelect={(row) => alert(row)}>
            <PenBoxIcon className="mr-4 h-4 w-4" />
            <span>ポリシー詳細</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onClick}>
            <Download className="mr-4 h-4 w-4" />
            <span>設定をダウンロード</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UploadIcon className="mr-4 h-4 w-4" />
            <span>設定をアップロード</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RefreshCw className="mr-4 h-4 w-4" />
            <span>Googleサーバーと同期</span>
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
              削除すると、端末には自動で「デフォルトポリシー」が適用されます。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction onClick={onClickDelete}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
