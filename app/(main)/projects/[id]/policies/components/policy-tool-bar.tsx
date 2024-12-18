"use client";

import { FormPolicy } from "@/app/(main)/types/policy";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

import { formPolicySchema } from "@/app/(main)/schema/policy";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useTransition } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { usePoliciesTableData } from "../../apps/data/use-policies-table";
import { upsertPolicy } from "../actions/upsert-policy";

export default function PolicyToolBar() {
  const form = useFormContext<FormPolicy>();
  const params = useParams();
  const enterpriseName = `enterprises/${params.id}`;
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const policyId = searchParams.get("policyId");
  const key = `/api/policies/table/${enterpriseName}`;
  const { addPolicyTableData } = usePoliciesTableData(key, enterpriseName);

  const handleSave = async (data: FormPolicy) => {
    startTransition(async () => {
      if (!policyId) {
        toast.error("ポリシーIDが取得できませんでした。");
        return;
      }
      if (!data.display_name) {
        toast.error("ポリシー名を設定してください。");
        return;
      }
      const policyDisplayName = data.display_name;
      const parsed = formPolicySchema.parse(data);

      console.log("parsed", parsed);
      const policy = await upsertPolicy(
        policyId,
        policyDisplayName,
        enterpriseName,
        parsed.policy_config_data
      );
      // console.log("policy", policy);
      await addPolicyTableData(policy);
      const policyName = policy.policy_name.split("/")[3];
      router.push(`${pathname}/?policyId=${policyName}`);
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSave)}
      className="h-14 px-4 flex flex-row items-center gap-2"
    >
      <span className="text-sm">ポリシー名：</span>
      <FormField
        control={form.control}
        name="display_name"
        render={({ field }) => (
          <FormItem className="w-[200px]">
            <FormControl>
              <Input
                placeholder="ポリシー名"
                {...field}
                autoComplete="off"
                className="h-8"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <span className="flex-1" />
      <Button
        disabled={isPending || !form.formState.isValid}
        className="h-8"
        variant="outline"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            保存中...
          </>
        ) : (
          "保存"
        )}
      </Button>
    </form>
  );
}
