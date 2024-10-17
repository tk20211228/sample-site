"use client";

import { signInWithGithub } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function GitHubLoginButton({ className }: { className?: string }) {
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
    <form onSubmit={handleSignIn} className={cn("", className)}>
      <Button
        variant="outline"
        className={cn("", className)}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ログイン中...
          </>
        ) : (
          <>
            <SiGithub size={20} className="mr-4" />
            Github
          </>
        )}
      </Button>
    </form>
  );
}
