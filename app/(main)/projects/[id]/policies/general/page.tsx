"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Page() {
  const [policyDisplayName, setPolicyDisplayName] = useState("");
  const handleSave = async () => {
    console.log(policyDisplayName);
    await createPolicy(policyDisplayName);
  };
  return (
    <div className="flex flex-col gap-2 p-2">
      <h2 className="text-2xl font-bold">ポリシー作成</h2>
      <Input
        placeholder="ポリシー名"
        className="w-1/4"
        value={policyDisplayName}
        onChange={(e) => setPolicyDisplayName(e.target.value)}
      />
      <Button className="w-16" onClick={handleSave}>
        保存
      </Button>
    </div>
  );
}
