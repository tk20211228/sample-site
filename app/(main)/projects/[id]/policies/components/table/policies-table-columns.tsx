"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { formatToJapaneseDateTime } from "@/lib/date-fns/get-date";
import { ArrowUpDown, PlusIcon } from "lucide-react";
import { selectColumn } from "../../../../components/table/select-column";
import { PolicyTableType } from "../../types/policy";

import PoliciesTableMenu from "./policies-table-menu";
import { DataTableColumnSortHeader } from "@/app/(main)/projects/components/table/data-table-column-sort-header";

type ColumnMeta = {
  title: string;
};

export type PolicyColumnDef = ColumnDef<PolicyTableType> & {
  meta: ColumnMeta;
};

export const policyColumns: PolicyColumnDef[] = [
  selectColumn<PolicyTableType>(),
  {
    accessorKey: "number",
    accessorFn: (_, index) => index + 1,
    minSize: 48, //05
    size: 48, //
    header: ({ column }) => (
      <div className={"flex items-center justify-center space-x-2"}>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-2 flex group"
        >
          <span className="group-hover:hidden size-4">No.</span>
          <ArrowUpDown className="size-4 hidden group-hover:block" />
        </Button>
      </div>
    ),
    cell: ({ row }) => (
      <div
        className="truncate flex items-center justify-center"
        title={String(row.index + 1)}
      >
        {row.index + 1}
      </div>
    ),
    meta: {
      title: "No.",
    },
  },
  {
    accessorKey: "display_name",
    minSize: 170,
    size: 250,
    header: ({ column }) => (
      <DataTableColumnSortHeader column={column} title="ポリシー名" />
    ),
    cell: ({ row }) => (
      <div className="truncate" title={row.getValue("display_name")}>
        {row.getValue("display_name")}
      </div>
    ),
    filterFn: "includesString", //大文字と小文字を区別しない
    meta: {
      title: "ポリシー名",
    },
  },
  {
    accessorKey: "version",
    minSize: 120,
    size: 120,
    header: ({ column }) => (
      <DataTableColumnSortHeader column={column} title="Ver." />
    ),
    cell: ({ row }) => (
      <div
        className="truncate flex items-center justify-center"
        title={row.getValue("version")}
      >
        {row.getValue("version")}
      </div>
    ),
    meta: {
      title: "Ver.",
    },
  },
  {
    accessorKey: "created_at",
    minSize: 200,
    size: 200,
    header: ({ column }) => (
      <DataTableColumnSortHeader column={column} title="作成日時" />
    ),
    cell: ({ row }) => (
      <div
        className="truncate flex items-center justify-center"
        title={row.getValue("created_at")}
      >
        {formatToJapaneseDateTime(row.getValue("created_at"))}
      </div>
    ),
    meta: {
      title: "作成日時",
    },
  },
  {
    accessorKey: "updated_at",
    minSize: 200,
    size: 200,
    header: ({ column }) => (
      <DataTableColumnSortHeader column={column} title="更新日時" />
    ),
    cell: ({ row }) => (
      <div
        className="truncate flex items-center justify-center"
        title={row.getValue("updated_at")}
      >
        {formatToJapaneseDateTime(row.getValue("updated_at"))}
      </div>
    ),
    meta: {
      title: "更新日時",
    },
  },
  {
    id: "actions",
    enableResizing: false, // リサイズを無効化
    minSize: 50,
    size: 80,
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" size="icon">
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">カラムを追加</span>
          </Button>
          <div title="カラムを追加" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <PoliciesTableMenu row={row} />
        </div>
      );
    },
    meta: {
      title: "操作",
    },
  },
];
