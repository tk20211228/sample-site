"use client";

import { Table } from "@tanstack/react-table";
import { RefreshCcwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface PublicAppsTableToolbarProps<TData> {
  table: Table<TData>;
  className?: string;
}

export function PublicAppsTableToolbar<TData>({
  className,
  table,
}: PublicAppsTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-1 w-full",
        className
      )}
    >
      <div className="flex flex-1 min-w-0 items-center space-x-2">
        <SidebarTrigger className="min-w-[40px]" />
        <Input
          placeholder="アプリ名を検索"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-full"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8"
            size="icon"
          >
            <span className="sr-only">リセット</span>
            <RefreshCcwIcon className="size-4" />
          </Button>
        )}
      </div>
      <div className="flex text-xs text-muted-foreground items-center justify-center min-w-[37px] pr-1">
        {table.getFilteredRowModel().rows.length}
      </div>
    </div>
  );
}
