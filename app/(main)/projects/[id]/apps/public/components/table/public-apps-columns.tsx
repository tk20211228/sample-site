"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, PlusIcon } from "lucide-react";

import { PublicAppsTableType } from "@/app/(main)/types/apps";
import Image from "next/image";
import { DataTableColumnSortHeader } from "../../../../../components/table/data-table-column-sort-header";
import PublicAppsTableMenu from "./public-apps-table-menu";

export type PublicAppsColumnDef = ColumnDef<PublicAppsTableType>;

export const publicAppsColumns: PublicAppsColumnDef[] = [
  {
    accessorKey: "number",
    accessorFn: (_, index) => index + 1,
    minSize: 48, //
    size: 48, //
    enableResizing: false, // リサイズを無効化
    header: ({ column }) => (
      <div className={"flex items-center justify-center space-x-2 "}>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-2 flex group h-8"
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
  },
  {
    accessorKey: "iconUrl",
    minSize: 40,
    size: 40,
    header: () => (
      <div className="flex items-center justify-center size-10">Icon</div>
    ),
    cell: ({ row }) => (
      <div className="p-1 size-12">
        <div
          className="overflow-hidden border-default rounded-md size-10 relative"
          title={row.getValue("iconUrl")}
        >
          <Image
            src={row.getValue("iconUrl")}
            alt="アプリアイコン"
            sizes="40px"
            fill
          />
        </div>
      </div>
    ),
    enableResizing: false, // リサイズを無効化
  },
  {
    accessorKey: "title",
    minSize: 170,
    size: 250,
    header: ({ column }) => (
      <DataTableColumnSortHeader column={column} title="アプリ名" />
    ),
    cell: ({ row }) => (
      <div className="truncate pl-4" title={row.getValue("title")}>
        {row.getValue("title")}
      </div>
    ),
    filterFn: "includesString", //大文字と小文字を区別しない
  },
  {
    id: "actions",
    enableResizing: false, // リサイズを無効化
    minSize: 40,
    size: 40,
    header: () => {
      return (
        <div className="flex items-center justify-center">
          <Button variant="ghost" size="icon" className="h-8">
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
          <PublicAppsTableMenu row={row} />
        </div>
      );
    },
  },
];
