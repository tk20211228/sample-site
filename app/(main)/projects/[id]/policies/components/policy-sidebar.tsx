"use client";

import {
  AppWindowIcon,
  FilePlusIcon,
  HistoryIcon,
  LayoutListIcon,
  NetworkIcon,
  SearchIcon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { SiGooglechrome, SiGoogleplay } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEnterprise } from "../../providers/enterprise";

export function PolicySidebar({ className }: { className?: string }) {
  const { enterpriseId } = useEnterprise();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const policyId = searchParams.get("policyId") ?? "new";

  return (
    <Sidebar
      className={cn("inset-x-14", className)}
      // collapsible="icon"
    >
      {/* // <Sidebar variant="inset"> */}
      <SidebarHeader className="border-b flex min-h-12 px-6">
        <SidebarContent>
          <h4 className="text-lg font-bold">ポリシー</h4>
        </SidebarContent>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 font-mono">
            ポリシー一覧
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {policyListItems.map((policyListItems) => {
                const fullPath = `/projects/${enterpriseId}${policyListItems.url}?policyId=${policyId}`;
                const isActive = pathname === fullPath;

                return (
                  <SidebarMenuItem key={policyListItems.title} className="px-3">
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={fullPath}>
                        <policyListItems.icon
                          className={cn(!isActive && "text-muted-foreground")}
                        />
                        <span
                          className={cn(
                            "font-semibold pl-2",
                            !isActive && "text-muted-foreground"
                          )}
                        >
                          {policyListItems.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 font-mono">
            ポリシー詳細
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {policyDetailItems.map((policyDetailItems) => {
                const fullPath = `/projects/${enterpriseId}${policyDetailItems.url}?policyId=${policyId}`;
                const isActive = pathname === fullPath;

                return (
                  <SidebarMenuItem
                    key={policyDetailItems.title}
                    className="px-3"
                  >
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={fullPath}>
                        <policyDetailItems.icon
                          className={cn(!isActive && "text-muted-foreground")}
                        />
                        <span
                          className={cn(
                            "font-semibold pl-2",
                            !isActive && "text-muted-foreground"
                          )}
                        >
                          {policyDetailItems.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 font-mono">
            スケジュール配信
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {scheduleDeliveryItems.map((scheduleDeliveryItems) => {
                const fullPath = `/projects/${enterpriseId}${scheduleDeliveryItems.url}`;
                const isActive = pathname === fullPath;

                return (
                  <SidebarMenuItem
                    key={scheduleDeliveryItems.title}
                    className="px-3"
                  >
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={fullPath}>
                        <scheduleDeliveryItems.icon
                          className={cn(!isActive && "text-muted-foreground")}
                        />
                        <span
                          className={cn(
                            "font-semibold pl-2",
                            !isActive && "text-muted-foreground"
                          )}
                        >
                          {scheduleDeliveryItems.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
      </SidebarContent>
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}

// Menu items.
const policyListItems = [
  {
    title: "リスト",
    url: "/policies",
    icon: LayoutListIcon,
  },
  {
    title: "詳細検索",
    url: "/policies/search",
    icon: SearchIcon,
  },
  {
    title: "履歴",
    url: "/policies/history",
    icon: HistoryIcon,
  },
  {
    title: "作成ログ",
    url: "/policies/create-log",
    icon: FilePlusIcon,
  },
];
// Menu items.
const policyDetailItems = [
  {
    title: "端末全般",
    url: "/policies/device-general",
    icon: LayoutListIcon,
  },
  {
    title: "画面ロック",
    url: "/policies/lock-screen",
    icon: SearchIcon,
  },
  {
    title: "ネットワーク",
    url: "/policies/network",
    icon: NetworkIcon,
  },
  {
    title: "Google Play",
    url: "/policies/google-play",
    icon: SiGoogleplay,
  },
  {
    title: "アプリケーション",
    url: "/policies/application",
    icon: AppWindowIcon,
  },
  {
    title: "Chrome ブラウザ",
    url: "/policies/chrome-browser",
    icon: SiGooglechrome,
  },
  {
    title: "操作ログ",
    url: "/policies/operation-log",
    icon: FilePlusIcon,
  },
];

// Menu items.
const scheduleDeliveryItems = [
  {
    title: "スケジュール一覧",
    url: "/policies/schedule-list",
    icon: LayoutListIcon,
  },
  {
    title: "配信ログ",
    url: "/policies/delivery-log",
    icon: SearchIcon,
  },
];
