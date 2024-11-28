"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import DateTableColumnAllResizer from "../../../devices/components/data-table-column-all-resizer";
import { DataTableViewOptions } from "../../../devices/components/data-table-view-options";
import { PolicyTableType } from "../../types/policy";
import SyncPoliciesButton from "../sync-policies-button";
import DataTableRowResizeButton from "./data-table-row-resizer";
import DeleteSelectedPoliciesButton from "./delete-selected-policies-button";

interface PoliciesTableToolbarProps<TData extends PolicyTableType> {
  table: Table<TData>;
  // table: Table<TData & PolicyTableType>;
  className?: string;
}

export function PoliciesTableToolbar<TData extends PolicyTableType>({
  className,
  table,
}: PoliciesTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  // const { enterpriseId } = useEnterprise();

  return (
    <div
      className={cn("flex items-center justify-between space-x-2", className)}
    >
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="ポリシー名を検索"
          value={
            (table.getColumn("display_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("display_name")?.setFilterValue(event.target.value)
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
      <DeleteSelectedPoliciesButton table={table} />

      <DataTableRowResizeButton table={table} />
      <SyncPoliciesButton />
      <DateTableColumnAllResizer table={table} />
      <DataTableViewOptions table={table} />
    </div>
  );
}
