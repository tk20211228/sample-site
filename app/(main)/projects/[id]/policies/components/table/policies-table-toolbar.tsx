"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "../../../devices/components/data-table-view-options";
import DateTableColumnAllResizer from "../../../devices/components/data-table-column-all-resizer";
import { cn } from "@/lib/utils";
import SyncPoliciesButton from "../sync-policies-button";
import Link from "next/link";
import { useEnterprise } from "../../../providers/enterprise";

interface PoliciesTableToolbarProps<TData> {
  table: Table<TData>;
  className?: string;
}

export function PoliciesTableToolbar<TData>({
  className,
  table,
}: PoliciesTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { enterpriseId } = useEnterprise();

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
      <Button className="h-8" asChild>
        <Link href={`/projects/${enterpriseId}/policies/general`}>
          ポリシー作成
        </Link>
      </Button>
      <SyncPoliciesButton />
      <DateTableColumnAllResizer table={table} />
      <DataTableViewOptions table={table} />
    </div>
  );
}
