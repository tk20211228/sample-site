"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { deviceStates } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="enrollmentTokenName"
          value={
            (table
              .getColumn("enrollmentTokenName")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn("enrollmentTokenName")
              ?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("state") && (
          <DataTableFacetedFilter
            column={table.getColumn("state")}
            title="ステータス"
            options={deviceStates}
          />
        )}
        {/* {table.getColumn("updateStatue") && (
          <DataTableFacetedFilter
            column={table.getColumn("updateStatue")}
            title="セキュリティ"
            options={updateStatuses}
          />
        )} */}
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

      {/* <DateTableColumnAllResizer table={table} /> */}
      <DataTableViewOptions table={table} />
    </div>
  );
}
