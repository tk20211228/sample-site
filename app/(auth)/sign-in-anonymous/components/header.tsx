"use client";

import HeaderLogoButton from "@/components/header-logo-button";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { useEffect, useState } from "react";
import ClientSideLoginButton from "./sign-login-button";

export default function Header() {
  const [userId, setUserId] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.onAuthStateChange((event, session) => {
      const userId = session?.user.id;
      setUserId(userId || null);
    });
  }, []);

  const isLoading = userId === undefined;
  const isLoggedIn = Boolean(userId);
  const isLoggedOut = userId === null;

  return (
    <header className="flex mx-auto justify-between items-center container h-16 border-b px-2 py-3 ">
      <HeaderLogoButton />
      {isLoggedIn && (
        <Image
          src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${userId}`}
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full border size-10"
        />
      )}
      {isLoggedOut && <ClientSideLoginButton variant="ghost" className="" />}
      {isLoading && (
        <div className="rounded-full animate-pulse size-10 bg-zinc-900"></div>
      )}
    </header>
  );
}
