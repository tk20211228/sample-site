"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { useEnterprise } from "../../../providers/enterprise";
import { usePolicy } from "../../../providers/policy";
import { createPolicy } from "../../actions/create-policy";

import { createPolicySchema } from "@/app/(main)/schema/policy";
import { CreatePolicyForm } from "@/app/(main)/types/policy";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useFormContext } from "react-hook-form";

export default function CreateGeneralPolicyForm() {
  const form = useFormContext<CreatePolicyForm>();
  const {
    policyTableData,
    setPolicyTableData,
    currentCreatePolicy,
    setCurrentCreatePolicy,
  } = usePolicy();
  const { enterpriseName } = useEnterprise();
  const [isPending, startTransition] = useTransition();

  const handleSave = async (data: CreatePolicyForm) => {
    startTransition(async () => {
      const policyDisplayName = data.displayName ?? "";
      const isDefaultPolicy = policyTableData.find(
        (policy) => policy.display_name === policyDisplayName
      );
      if (isDefaultPolicy) {
        alert("同じポリシー名が存在するため、作成することができません。");
        return;
      }
      const parsed = createPolicySchema.parse(data);
      const requestBody = parsed;
      const policy = await createPolicy(
        policyDisplayName,
        enterpriseName,
        requestBody
      );
      setPolicyTableData([...policyTableData, policy]);
      setCurrentCreatePolicy(data);
    });
  };
  console.log("currentCreatePolicy", currentCreatePolicy);

  return (
    <>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8 p-2">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem className="w-1/4">
                <FormControl>
                  <Input
                    placeholder="ポリシー名"
                    {...field}
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="screenCaptureDisabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
                <div className="space-y-1 leading-none">
                  <FormLabel>画面キャプチャーの無効化</FormLabel>
                  <FormDescription>
                    画面キャプチャーを無効にします。
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isPending || !form.formState.isValid}>
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
    </>
    // </div>
  );
}
