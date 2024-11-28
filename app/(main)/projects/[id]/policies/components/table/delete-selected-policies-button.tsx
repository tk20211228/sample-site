"use client";

import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { PolicyTableType } from "../../types/policy";
import { deleteSelectedPolicies } from "../../actions/delete-policy";
import { usePolicy } from "../../../providers/policy";
import { defaultPolicyPattern } from "@/app/(main)/data/policy";
import { useTransition } from "react";

interface DeleteSelectedPoliciesButtonProps<TData extends PolicyTableType> {
  table: Table<TData>;
}

export default function DeleteSelectedPoliciesButton<
  TData extends PolicyTableType
>({ table }: DeleteSelectedPoliciesButtonProps<TData>) {
  const { policyTableData, setPolicyTableData } = usePolicy();
  const [isPending, startTransition] = useTransition();
  const handleDeletePolicies = async () => {
    const deletePolicyNameList = table.getSelectedRowModel().rows.map((row) => {
      if (defaultPolicyPattern.test(row.original.policy_name)) {
        alert(
          "デフォルトポリシーは削除できません。デフォルトポリシー以外を削除します。"
        );
      }
      return row.original.policy_name;
    });
    startTransition(async () => {
      await deleteSelectedPolicies(deletePolicyNameList).then(
        (deletedPolicyNameList) => {
          alert("削除に成功しました。");
          // 削除したポリシーを除外したデータをセット
          const newData = policyTableData.filter(
            (p) => !deletedPolicyNameList.includes(p.policy_name)
          );
          setPolicyTableData(newData);
        }
      );
    });
  };

  return (
    <Button
      variant="outline"
      className="h-8 px-2 lg:px-3"
      onClick={handleDeletePolicies}
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2Icon className="size-4 w-full animate-spin" />
        </>
      ) : (
        <>
          <Trash2Icon className="size-4 mr-2 text-red-500" />
          削除
        </>
      )}
    </Button>
  );
}
