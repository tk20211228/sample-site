"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Checkbox } from "@/components/ui/checkbox";
import { useFormContext } from "react-hook-form";

import { FormPolicy } from "@/app/(main)/types/policy";

export default function DeviceGeneralForm() {
  const form = useFormContext<FormPolicy>();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 px-2">
      <FormField
        control={form.control}
        name="policy_config_data.screenCaptureDisabled"
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
  );
}
