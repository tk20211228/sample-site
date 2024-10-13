"use client";

import { useAuth } from "./auth-provider";

export default function GetAuthProviderSignedIn({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authUser, isLoading } = useAuth();

  if (isLoading) {
    return null; // または適切なローディングインジケーターを表示
  }

  if (authUser) {
    return children;
  }

  return null;
}
