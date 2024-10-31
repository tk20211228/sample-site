"use client"; // 一時的にクライエントサイドのみで実行する

import { signupUrl, signupUrl1, signupUrl2 } from "@/actions/emm/signup-url";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { notifyError } from "@/lib/notify-error";
import Link from "next/link";
import Form from "next/form";
import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export default function Page() {
  const createSignupUrl = async () => {
    await signupUrl().catch((error) => {
      notifyError(error);
    });
  };
  const createSignupUrl1 = async () => {
    await signupUrl1().catch((error) => {
      notifyError(error);
    });
  };
  const createSignupUrl2 = async () => {
    await signupUrl2().catch((error) => {
      notifyError(error);
    });
  };

  function SubmitButton() {
    const status = useFormStatus();
    return (
      <Button disabled={status.pending}>
        {status.pending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            実行中...
          </>
        ) : (
          "クリック２"
        )}
      </Button>
    );
  }
  return (
    <div>
      <h1>ダッシュボード</h1>
      <Button variant="outline" asChild>
        <Link href="/profile">マイページへ</Link>
      </Button>
      <Card>
        <CardHeader>
          <h2>初期設定</h2>
        </CardHeader>
        <CardContent>
          <p>エンタープライズIDの作成</p>
          <div className="flex gap-2 pt-2">
            <Button onClick={createSignupUrl}>クリック</Button>
            <Button onClick={createSignupUrl1}>クリック1</Button>
            <Form action={createSignupUrl2}>
              <SubmitButton />
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
