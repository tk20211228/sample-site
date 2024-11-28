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

import { editPolicyFormSchema } from "@/app/(main)/schema/policy";
import { Row } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useEnterprise } from "../../../providers/enterprise";
import { usePolicy } from "../../../providers/policy";
import { deletePolicy } from "../../actions/delete-policy";
import { editPolicy } from "../../actions/edit-policy";
import { PolicyTableType } from "../../types/policy";

interface DataTableMenuProps {
  row: Row<PolicyTableType>;
}

export default function PoliciesTableMenu({ row }: DataTableMenuProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    policyTableData,
    setPolicyTableData,
    // currentCreatePolicy,
    setCurrentCreatePolicy,
  } = usePolicy();
  const { enterpriseName, enterpriseId } = useEnterprise();
  const router = useRouter();

  const onClick = async () => {
    console.log(parent);
  };
  const handleDelete = async () => {
    if (row.original.policy_name === enterpriseName + "/policies/default") {
      alert("デフォルトポリシーは削除できません。");
      return;
    }
    await deletePolicy(row.original.policy_name).then((policyName) => {
      alert("削除に成功しました。");
      const newData = policyTableData.filter(
        (p) => p.policy_name !== policyName
      );
      setPolicyTableData(newData);
    });
  };
  const handleEditPolicy = async () => {
    const data = await editPolicy(row.original.policy_name);
    if (!data) return;
    const displayName = row.original.display_name ?? "";
    const policyConfigData = data.policy_config_data;
    const parsed = editPolicyFormSchema.parse(policyConfigData);
    parsed.displayName = displayName;
    setCurrentCreatePolicy(parsed);
    router.push(`/projects/${enterpriseId}/policies/general`);
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
          <DropdownMenuItem onSelect={handleEditPolicy}>
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
            <AlertDialogAction onClick={handleDelete}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
