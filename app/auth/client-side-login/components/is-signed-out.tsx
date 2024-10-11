"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function IsSignedOut({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.onAuthStateChange((event, session) => {
      const userId = session?.user.id;
      setUserId(userId || null);
    });
  }, []);

  if (userId) {
    return null;
  }

  return <>{children}</>;
}
