"use client";

import { defaultPolicyPattern } from "@/app/(main)/data/policy";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { usePoliciesTableData } from "../../../apps/data/use-policies-table";
import { deleteSelectedPolicies } from "../../actions/delete-policy";
import { PolicyTableType } from "../../types/policy";

interface DeleteSelectedPoliciesButtonProps<TData extends PolicyTableType> {
  table: Table<TData>;
}

export default function DeleteSelectedPoliciesButton<
  TData extends PolicyTableType
>({ table }: DeleteSelectedPoliciesButtonProps<TData>) {
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const enterpriseId = params.id;
  const router = useRouter();
  const enterpriseName = `enterprises/${enterpriseId}`;
  const key = `/api/policies/table/${enterpriseName}`;
  const { deletePoliciesTableData } = usePoliciesTableData(key, enterpriseName);

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
        async (policiesTableIds) => {
          await deletePoliciesTableData(policiesTableIds);
          toast.success("ポリシーを削除しました。");
          router.push(`/projects/${enterpriseId}/policies`);
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
      size="icon"
    >
      {isPending ? (
        <Loader2Icon className="size-4 w-full animate-spin" />
      ) : (
        <Trash2Icon className="size-4 text-red-500" />
      )}
    </Button>
  );
}
