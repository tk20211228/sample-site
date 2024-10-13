"use client";

import { Button } from "@/components/ui/button";
import { Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";

export default function SingInButton() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    router.push("/login");
    // signOut();
  };

  return (
    <form onSubmit={handleSignIn}>
      <Button variant="ghost" className="gap-2" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span className="hidden sm:block">ログイン中...</span>
          </>
        ) : (
          <>
            <p className="hidden sm:block">ログイン</p>
            <LogIn size={20} />
          </>
        )}
      </Button>
    </form>
  );
}
