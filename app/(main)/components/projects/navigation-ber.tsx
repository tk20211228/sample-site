"use client";

import { AppConfig } from "@/app.config";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/public/images/logo.png";
import { SiAndroid } from "@icons-pack/react-simple-icons";
import { HomeIcon, ShieldCheckIcon, SmartphoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProjectLinkButton from "../../projects/components/project-link-button";
import UserMenu from "./user-menu";

export default function NavigationBar({
  className,
  enterpriseId,
}: {
  className?: string;
  enterpriseId: string;
}) {
  return (
    <div className={cn("relative w-14 h-dvh", className)}>
      <nav
        aria-label="ナビゲーションバー"
        className="absolute group p-2 h-full z-40 w-14 hover:w-52 shadow-none hover:shadow-xl border-r border-default transition-width duration-200 overflow-hidden flex flex-col justify-between bg-background"
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
              <span className="opacity-0 transition group-hover:opacity-100 text-lg">
                {AppConfig.title}
              </span>
            </Link>
          </Button>
          <Button variant="ghost" className="relative gap-2" disabled={true}>
            <HomeIcon size={20} className="absolute left-3" />
            <span className="opacity-0 group-hover:opacity-100">ホーム</span>
          </Button>
          <ProjectLinkButton mode="hover" />

          <Button variant="ghost" className="relative gap-2" asChild>
            <Link href={`/${enterpriseId}/devices`}>
              <SmartphoneIcon size={20} className="absolute left-3" />
              <span className="opacity-0 group-hover:opacity-100">
                デバイス
              </span>
            </Link>
          </Button>

          <Button variant="ghost" className="relative gap-2" asChild>
            <Link href={`/${enterpriseId}/policies`}>
              <ShieldCheckIcon size={20} className="absolute left-3" />
              <span className="opacity-0 group-hover:opacity-100">
                ポリシー
              </span>
            </Link>
          </Button>
          <Button variant="ghost" className="relative gap-2" asChild>
            <Link href={`/${enterpriseId}/apps`}>
              <SiAndroid size={20} className="absolute left-3" />
              <span className="opacity-0 group-hover:opacity-100">
                アプリ管理
              </span>
            </Link>
          </Button>
        </ul>

        <ul className="flex flex-col gap-2 pb-1">
          <UserMenu mode="hover" />
        </ul>
      </nav>
    </div>
  );
}
