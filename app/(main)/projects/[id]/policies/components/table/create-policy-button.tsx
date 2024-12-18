"use client";

import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEnterprise } from "../../../providers/enterprise";
import { FormPolicy } from "@/app/(main)/types/policy";

export default function CreatePolicyButton() {
  const router = useRouter();
  const { enterpriseId } = useEnterprise();
  const form = useFormContext<FormPolicy>();

  return (
    <Button
      variant="outline"
      className="flex items-center h-8"
      onClick={() => {
        form.reset();
        router.push(
          `/projects/${enterpriseId}/policies/device-general?policyId=new`
        );
      }}
    >
      <PlusIcon className="mr-2" />
      <span>ポリシーを作成</span>
    </Button>
  );
}
