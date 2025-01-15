"use client";

import { signOut } from "@/actions/auth-social ";
import HeaderLogoButton from "@/components/header-logo-button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import UserMenu from "../../components/projects/user-menu";
import ProjectLinkButton from "./project-link-button";
import SignOutButton from "./sign-out-button";

export function ProjectsSidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const projectPath = `/projects`;
  const isActive = pathname === projectPath;

  return (
    <div className={cn("w-64 h-dvh border-r flex flex-col", className)}>
      <nav className="flex flex-col justify-between h-full px-2">
        <ul className="flex flex-col space-y-2">
          <li className="h-12 py-1 border-b">
            <HeaderLogoButton className="w-full py-1" />
          </li>
          <ProjectLinkButton isActive={isActive} />
        </ul>

        <ul className="flex flex-col gap-1">
          <form action={signOut}>
            <SignOutButton />
          </form>
          <UserMenu />
        </ul>
      </nav>
    </div>
  );
}
