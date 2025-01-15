"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { RouteParams } from "@/app/types/enterprise";
import { CATEGORIES, CATEGORY_NAMES } from "../../data/categories";

export default function NavTabs({
  className,
  deviceId,
}: {
  className?: string;
  deviceId: string;
}) {
  const pathname = usePathname();
  const params = useParams<RouteParams>();
  const enterpriseId = params.enterpriseId;

  const categories = CATEGORIES.map((category) => ({
    name: CATEGORY_NAMES[category],
    href: `/${enterpriseId}/devices/${deviceId}/${category}`,
  }));

  return (
    <nav className={cn("flex space-x-4", className)}>
      {categories.map((category) => (
        <Link
          key={category.href}
          href={category.href}
          className={cn(
            "px-3 py-2 rounded-md",
            pathname === category.href
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}
