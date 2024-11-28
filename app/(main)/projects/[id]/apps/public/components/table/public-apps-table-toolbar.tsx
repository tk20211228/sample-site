"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { DataTableViewOptions } from "../../../devices/components/data-table-view-options";
// import DateTableColumnAllResizer from "../../../devices/components/data-table-column-all-resizer";
import { cn } from "@/lib/utils";
// import SyncPoliciesButton from "../sync-policies-button";
// import { useEnterprise } from "../../../providers/enterprise";
// import DataTableRowResizeButton from "./data-table-row-resizer";
// import DeleteSelectedPoliciesButton from "./delete-selected-policies-button";

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
      className={cn("flex items-center justify-between space-x-2", className)}
    >
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="アプリ名を検索"
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            リセット
            <X className="size-5 ml-2" />
          </Button>
        )}
      </div>
      <div className="flex justify-end pr-3 text-sm text-muted-foreground">
        {table.getFilteredRowModel().rows.length}
      </div>
    </div>
  );
}
