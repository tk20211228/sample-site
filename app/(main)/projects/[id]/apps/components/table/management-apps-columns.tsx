"use client";

import { ColumnDef } from "@tanstack/react-table";

import { AppsTableType } from "@/app/(main)/types/apps";
import Image from "next/image";
import PublicAppsTableMenu from "./apps-table-menu";
import { DataTableColumnSortHeader } from "@/app/(main)/projects/components/table/data-table-column-sort-header";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { selectColumn } from "@/app/(main)/projects/components/table/select-column";
import {
  formatToJapaneseDate,
  formatToJapaneseDateTime,
} from "@/lib/date-fns/get-date";

export type ManagementAppsColumnDef = ColumnDef<AppsTableType>;

export const ManagementAppsColumns: ManagementAppsColumnDef[] = [
  selectColumn<AppsTableType>(),
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
    size: 50,
    header: () => (
      <div className="flex items-center justify-center size-10 pt-1">Icon</div>
    ),
    cell: ({ row }) => (
      <div className="p-1 size-12">
        <div
          className="overflow-hidden border-default rounded-md size-10 relative border"
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
    minSize: 100,
    size: 300,
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
    accessorKey: "name",
    minSize: 100,
    size: 320,
    header: ({ column }) => (
      <DataTableColumnSortHeader column={column} title="パッケージ名" />
    ),
    cell: ({ row }) => (
      <div className="truncate pl-4" title={row.getValue("name")}>
        {(row.getValue("name") as string).replace(
          /^enterprises\/.*\/applications\//,
          ""
        )}
      </div>
    ),
  },
  {
    accessorKey: "updateTime",
    minSize: 155,
    size: 170,
    header: ({ column }) => (
      <DataTableColumnSortHeader
        column={column}
        title="アプリ更新日"
        className=""
      />
    ),
    cell: ({ row }) => (
      <div
        className="truncate flex items-center justify-center"
        title={row.getValue("updateTime")}
      >
        {formatToJapaneseDate(row.getValue("updateTime"))}
      </div>
    ),
    // enableResizing: false, // リサイズを無効化
  },
  {
    accessorKey: "minAndroidSdkVersion",
    minSize: 120,
    size: 120,
    header: ({ column }) => (
      <DataTableColumnSortHeader column={column} title="minSdkVersion" />
    ),
    cell: ({ row }) => (
      <div
        className="truncate flex items-center justify-center"
        title={row.getValue("minAndroidSdkVersion")}
      >
        {row.getValue("minAndroidSdkVersion")}
      </div>
    ),
  },
  {
    accessorKey: "appType",
    minSize: 120,
    size: 120,
    header: ({ column }) => (
      <DataTableColumnSortHeader column={column} title="アプリ種別" />
    ),
    cell: ({ row }) => (
      <div
        className="truncate flex items-center justify-center"
        title={row.getValue("appType")}
      >
        {row.getValue("appType") === "PUBLIC"
          ? "Google Play"
          : row.getValue("appType") === "PRIVATE"
          ? "限定公開"
          : row.getValue("appType") === "WEB"
          ? "Webアプリ"
          : "不明"}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    minSize: 155,
    size: 190,
    header: ({ column }) => (
      <DataTableColumnSortHeader
        column={column}
        title="アプリ情報の登録日"
        className=""
      />
    ),
    cell: ({ row }) => (
      <div
        className="truncate flex items-center justify-center pl-2"
        title={row.getValue("created_at")}
      >
        {formatToJapaneseDateTime(row.getValue("created_at"))}
      </div>
    ),
    // enableResizing: false, // リサイズを無効化
  },
  {
    accessorKey: "updated_at",
    minSize: 155,
    size: 190,
    header: ({ column }) => (
      <DataTableColumnSortHeader
        column={column}
        title="アプリ情報の更新日"
        className=""
      />
    ),
    cell: ({ row }) => (
      <div
        className="truncate flex items-center justify-center pl-2"
        title={row.getValue("updated_at")}
      >
        {formatToJapaneseDateTime(row.getValue("updated_at"))}
      </div>
    ),
    // enableResizing: false, // リサイズを無効化
  },
  {
    id: "actions",
    enableResizing: false, // リサイズを無効化
    minSize: 40,
    size: 40,
    header: () => {
      return <div className="flex items-center justify-center"></div>;
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <PublicAppsTableMenu row={row} className="size-6" />
        </div>
      );
    },
  },
];
