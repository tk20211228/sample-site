"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { usePolicy } from "../../../providers/policy";
import { useEnterprise } from "../../../providers/enterprise";
import { defaultPolicyRequestBody } from "@/data/default-policy-request-body";
import { createPolicy } from "../../actions/create-policy";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { CreatePolicyForm } from "@/app/(main)/types/policy";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPolicyFormSchema,
  createPolicySchema,
} from "@/app/(main)/schema/policy";
import { defaultGeneralConfig } from "../data/default-general-config";
import { Checkbox } from "@/components/ui/checkbox";

export default function CreateGeneralPolicyForm() {
  // const [policyDisplayName, setPolicyDisplayName] = useState("");
  const { policyTableData, setPolicyTableData } = usePolicy();
  const { enterpriseName } = useEnterprise();
  const handleSave = async (data: CreatePolicyForm) => {
    const policyDisplayName = data.displayName;
    console.log("data", data);
    const parsed = createPolicySchema.parse(data);
    console.log("parsed", parsed);
    const requestBody = parsed;
    const policy = await createPolicy(
      policyDisplayName,
      enterpriseName,
      requestBody
    );
    setPolicyTableData([...policyTableData, policy]);
    console.log("policy", policy);
  };
  const form = useForm<CreatePolicyForm>({
    mode: "onChange",
    resolver: zodResolver(createPolicyFormSchema),
    defaultValues: defaultGeneralConfig,
  });

  return (
    <Form {...form}>
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
                <div className="space-y-1 leading-none">
                  <FormLabel>画面キャプチャーの無効化</FormLabel>
                  <FormDescription>
                    画面キャプチャーを無効にします。
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          {/* <FormField
            control={form.control}
            name="cameraDisabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Camera Disabled</FormLabel>
                  <FormDescription>
                    Disable camera functionality (deprecated).
                  </FormDescription>
                </div>
              </FormItem>
            )}
          /> */}
          {/* <FormField
              control={form.control}
              name="keyguardDisabledFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keyguard Disabled Features</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select keyguard disabled features" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="secure">Secure</SelectItem>
                      <SelectItem value="trust">Trust</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select which keyguard features to disable.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          {/* <FormField
              control={form.control}
              name="defaultPermissionPolicy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Permission Policy</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select default permission policy" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="prompt">Prompt</SelectItem>
                      <SelectItem value="grant">Grant</SelectItem>
                      <SelectItem value="deny">Deny</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Set the default permission policy for apps.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          {/* <FormField
            control={form.control}
            name="accountTypesWithManagementDisabled"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Types with Management Disabled</FormLabel>
                <FormControl>
                  <Input placeholder="Enter account types" {...field} />
                </FormControl>
                <FormDescription>
                  Comma-separated list of account types.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          {/* <FormField
            control={form.control}
            name="addUserDisabled"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Add User Disabled</FormLabel>
                  <FormDescription>Disable adding new users.</FormDescription>
                </div>
              </FormItem>
            )}
          /> */}
        </div>
        <Button type="submit">保存</Button>
      </form>
    </Form>
    // </div>
  );
}
