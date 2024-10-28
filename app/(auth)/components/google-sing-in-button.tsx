"use client";

import { signInWithGoogle } from "@/actions/auth-social ";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function GoogleSingInButton({
  className,
}: {
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Google login failed:", error);
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
            <SiGoogle size={20} className="mr-4" />
            Google
          </>
        )}
      </Button>
    </form>
  );
}
