"use client";

import { signInWithGithub } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function GitHubLoginButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await signInWithGithub();
    } catch (error) {
      console.error("GitHub login failed:", error);
      setIsLoading(false);
    } finally {
      // setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <Button variant="ghost" className="border gap-2" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ログイン中...
          </>
        ) : (
          <>
            <SiGithub size={20} className="mr-2" />
            GitHub ログイン
          </>
        )}
      </Button>
    </form>
  );
}
