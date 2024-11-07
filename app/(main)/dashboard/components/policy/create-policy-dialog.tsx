"use client";

import { createPolicy } from "@/actions/emm/create-policy";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, PlusIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const policyNameSchema = z.object({
  policyName: z.string().min(1),
});

type FormData = z.infer<typeof policyNameSchema>;

export default function CreatePolicyDialog({ parent }: { parent: string }) {
  const [isPending, startTransition] = useTransition();
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(policyNameSchema),
    defaultValues: {
      policyName: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    startTransition(async () => {
      if (parent) {
        await createPolicy(parent, data.policyName)
          .then(() => {
            setIsDetailsDialogOpen(false);
            form.reset();
          })
          .catch((error) => {
            console.error("Failed to create policy:", error);
          });
      }
    });
  };

  return (
    <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground w-1/3"
        >
          <PlusIcon />
          <span className="sr-only">ポリシーを追加</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>新規ポリシーの作成</DialogTitle>
          <DialogDescription>
            新しいポリシーの名前を入力してください。
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 pb-2"
          >
            <FormField
              control={form.control}
              name="policyName"
              render={({ field }) => (
                <FormItem className="pb-2">
                  <FormControl>
                    <Input
                      className={`text-center text-xl text-primary ${
                        field.value ? "border-0" : "border-zinc-700"
                      }`}
                      autoComplete="off"
                      placeholder="ポリシー名を入力"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="w-1/3"
              disabled={isPending || !form.formState.isValid}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ポリシー作成中...
                </>
              ) : (
                <>ポリシーを作成する</>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
