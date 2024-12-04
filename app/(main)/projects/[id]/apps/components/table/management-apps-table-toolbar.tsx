"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { DataTableViewOptions } from "../../../devices/components/data-table-view-options";
// import DateTableColumnAllResizer from "../../../devices/components/data-table-column-all-resizer";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
// import SyncPoliciesButton from "../sync-policies-button";
// import { useEnterprise } from "../../../providers/enterprise";
// import DataTableRowResizeButton from "./data-table-row-resizer";
// import DeleteSelectedPoliciesButton from "./delete-selected-policies-button";

interface ManagementAppsTableToolbarProps<TData> {
  table: Table<TData>;
  className?: string;
}

export function ManagementAppsTableToolbar<TData>({
  className,
  table,
}: ManagementAppsTableToolbarProps<TData>) {
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
          className="h-8 w-60"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-1"
          >
            <span className="text-xs">リセット</span>
            <X className="size-5 ml-2" />
          </Button>
        )}
      </div>
      <div className="flex text-xs text-muted-foreground items-center justify-center min-w-[37px] pr-1">
        {table.getFilteredRowModel().rows.length}
      </div>
    </div>
  );
}
