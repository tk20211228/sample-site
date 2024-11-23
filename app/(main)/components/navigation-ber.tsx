"use client";

import { signOut } from "@/actions/auth-social ";
import { AppConfig } from "@/app.config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/public/images/logo.png";
import {
  AppWindowIcon,
  CircleUserRoundIcon,
  HomeIcon,
  LayoutDashboardIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "../projects/components/sign-out-button";
import { useEnterprise } from "../projects/[id]/providers/enterprise";

export default function NavigationBar({ className }: { className?: string }) {
  const { enterpriseId } = useEnterprise();
  return (
    <div className={cn("relative w-14 h-dvh", className)}>
      <nav
        aria-label="ナビゲーションバー"
        className="absolute group p-2 h-full z-30 w-14 hover:w-52 shadow-none hover:shadow-xl border-r border-default transition-width duration-200 overflow-hidden flex flex-col justify-between bg-background"
      >
        <ul className="flex flex-col gap-2">
          <Button variant="ghost" className="relative gap-2">
            <Link href="/" className="flex items-center font-bold gap-2 z-20">
              <Image
                src={logo}
                alt=""
                className="absolute left-1 size-8 dark:brightness-150 drop-shadow-lg"
                priority
              />
            </Link>
            <span className="opacity-0 transition group-hover:opacity-100 text-lg">
              {AppConfig.title}
            </span>
          </Button>
          <Button variant="ghost" className="relative gap-2" disabled={true}>
            <HomeIcon size={20} className="absolute left-2" />
            <span className="opacity-0 group-hover:opacity-100">ホーム</span>
          </Button>
          <Button variant="ghost" className="relative gap-2" asChild>
            <Link href="/projects">
              <LayoutDashboardIcon size={20} className="absolute left-2" />
              <span className="opacity-0 group-hover:opacity-100">
                プロジェクト
              </span>
            </Link>
          </Button>

          <Button variant="ghost" className="relative gap-2" asChild>
            <Link href={`/projects/${enterpriseId}/devices`}>
              <SmartphoneIcon size={20} className="absolute left-2" />
              <span className="opacity-0 group-hover:opacity-100">
                デバイス
              </span>
            </Link>
          </Button>

          <Button variant="ghost" className="relative gap-2" asChild>
            <Link href={`/projects/${enterpriseId}/policies`}>
              <ShieldCheckIcon size={20} className="absolute left-2" />
              <span className="opacity-0 group-hover:opacity-100">
                ポリシー
              </span>
            </Link>
          </Button>
          <Button variant="ghost" className="relative gap-2" disabled={true}>
            <AppWindowIcon size={20} className="absolute left-2" />
            <span className="opacity-0 group-hover:opacity-100">
              アプリ管理
            </span>
          </Button>
        </ul>

        <ul className="flex flex-col gap-2">
          <form action={signOut}>
            <SignOutButton />
          </form>
          <Button
            variant="ghost"
            className="relative gap-2 group-hover:w-full transition-all duration-200"
          >
            <CircleUserRoundIcon size={20} className="absolute left-2" />
            <span className="opacity-0 group-hover:opacity-100">ユーザー</span>
          </Button>
        </ul>
      </nav>
    </div>
  );
}
