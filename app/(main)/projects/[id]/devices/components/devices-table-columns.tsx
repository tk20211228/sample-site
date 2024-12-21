"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CheckCircle2Icon, LucideXCircle, PlusIcon } from "lucide-react"; // 行アクション

import { Button } from "@/components/ui/button";
import { formatToJapaneseDateTime } from "@/lib/date-fns/get-date";
import { devicesTableColumnList } from "../data/columnList";

import { DeviceTableType } from "@/app/(main)/types/device";
import { DataTableColumnHeader } from "../../../components/table/data-table-column-header";
import { generateSortFilterColumnsHeader } from "../../../components/table/generate-sort-filter-columns-header";
import { selectColumn } from "../../../components/table/select-column";
import DataTableColumnState from "./data-table-column-state";
import DataTableMenu from "./data-table-menu";

export const deviceColumns: ColumnDef<DeviceTableType>[] = [
  selectColumn<DeviceTableType>(),
  ...generateSortFilterColumnsHeader<DeviceTableType>(devicesTableColumnList),
  {
    accessorKey: "state",
    id: "ステータス",
    minSize: 160,
    size: 180,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
    cell: ({ row, column }) => {
      return <DataTableColumnState row={row} column={column} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   accessorKey: "enrollmentTokenName",
  //   id: "識別 ID",
  //   minSize: 250,
  //   size: 300,
  //   header: ({ column }) => {
  //     return (
  //       <div className="flex items-center justify-center">
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           {column.id}
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       </div>
  //     );
  //   },
  //   cell: ({ row, column }) => (
  //     <div className="truncate" title={row.getValue(column.id)}>
  //       {row.getValue(column.id)}
  //     </div>
  //   ),
  // },
  // {
  //   accessorKey: "appliedPolicyVersion",
  //   id: "ポリシー バージョン",
  //   minSize: 225,
  //   size: 250,
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title={column.id} />
  //   ),
  //   cell: ({ row, column }) => <div>{row.getValue(column.id)}</div>,
  // },
  {
    accessorKey: "policyCompliant",
    id: "ポリシー 準拠",
    minSize: 180,
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
    cell: ({ row, column }) => {
      const isCompliant = row.getValue(column.id);
      return (
        <div className="flex items-center justify-center">
          {isCompliant === true ? (
            <CheckCircle2Icon className="h-5 w-5 text-green-500" />
          ) : isCompliant === false ? (
            <LucideXCircle className="h-5 w-5 text-red-500" />
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "lastStatusReportTime",
    id: "同期時刻",
    minSize: 150,
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
    cell: ({ row, column }) => {
      return (
        <div>
          {row.getValue(column.id)
            ? formatToJapaneseDateTime(row.getValue(column.id))
            : "不明"}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "lastPolicySyncTime",
  //   id: "ポリシー同期時刻",
  //   minSize: 210,
  //   size: 220,
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title={column.id} />
  //   ),
  //   cell: ({ row, column }) => {
  //     return (
  //       <div>
  //         {row.getValue(column.id)
  //           ? formatToJapaneseDateTime(row.getValue(column.id))
  //           : "不明"}
  //       </div>
  //     );
  //   },
  // },
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
            <span className="sr-only">メニューを開く</span>
          </Button>
          <div title="メニュー" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <DataTableMenu row={row} />
        </div>
      );
    },
  },
];
