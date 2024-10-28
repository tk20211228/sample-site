"use client";

import { signInWithDiscord } from "@/actions/auth-social ";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SiDiscord } from "@icons-pack/react-simple-icons";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function DiscordSingInButton({
  className,
}: {
  className?: string;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await signInWithDiscord();
    } catch (error) {
      console.error("Discord login failed:", error);
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
            <SiDiscord size={20} className="mr-4" />
            Discord
          </>
        )}
      </Button>
    </form>
  );
}
