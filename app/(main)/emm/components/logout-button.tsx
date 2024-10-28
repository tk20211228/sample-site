"use client";

import { signOut } from "@/actions/auth-social ";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { useState } from "react";

export default function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    signOut();
  };

  return (
    <form onSubmit={handleSignIn}>
      <Button variant="ghost" className="gap-2" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <p className="hidden sm:block">ログアウト中...</p>
          </>
        ) : (
          <>
            <p className="hidden sm:block">ログアウト</p>
            <LogOut size={20} />
          </>
        )}
      </Button>
    </form>
  );
}
