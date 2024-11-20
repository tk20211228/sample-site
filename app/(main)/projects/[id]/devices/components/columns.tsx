"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
  ArrowUpDown,
  CheckCircle2Icon,
  LucideXCircle,
  PlusIcon,
} from "lucide-react"; // 行アクション

import { Button } from "@/components/ui/button";
import { formatToJapaneseDateTime } from "@/lib/date-fns/get-date";
import { devicesTableColumnList } from "../data/columnList";
import { Device } from "../types/device";
import { DataTableColumnHeader } from "./data-table-column-header";
import DataTableColumnState from "./data-table-column-state";
import DataTableMenu from "./data-table-menu";
import generateSortFilterColumns from "../../../components/table/generate-sort-filter-columns";
import { selectColumn } from "../../../components/table/select-column";

const regEnrollmentTokensPath = /enterprises\/.*?\/enrollmentTokens\//;

export const deviceColumns: ColumnDef<Device>[] = [
  selectColumn<Device>(),
  ...generateSortFilterColumns<Device>(devicesTableColumnList),
  // {
  //   id: "updateStatus",
  //   accessorFn: (device) =>
  //     device.device_config_data?.softwareInfo?.systemUpdateInfo?.updateStatus,
  //   minSize: 400,
  //   size: 400,
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="システム更新 ステータス" />
  //   ),
  //   cell: ({ row }) => <div>{row.getValue("updateStatus")}</div>,
  // },
  // {
  //   id: "apiLevel",
  //   accessorFn: (device) => device.device_config_data.apiLevel,
  //   minSize: 100,
  //   size: 150,
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="API Level" />
  //   ),
  //   cell: ({ row }) => (
  //     <div className="text-center">{row.getValue("apiLevel")}</div>
  //   ),
  // },
  {
    id: "state",
    accessorFn: (device) => device.device_config_data.state,
    minSize: 160,
    size: 180,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ステータス" />
    ),
    cell: ({ row }) => {
      return <DataTableColumnState row={row} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "enrollmentTokenName",
    accessorFn: (device) => device.device_config_data.enrollmentTokenName,
    // accessorFn: (device) => {
    //   const fullPath = device.device_config_data.enrollmentTokenName;
    //   if (!fullPath) return null;
    //   return fullPath.replace(regEnrollmentTokensPath, "");
    // },
    minSize: 250,
    size: 300,
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            識別 ID
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="truncate" title={row.getValue("enrollmentTokenName")}>
        {row.getValue("enrollmentTokenName")}
      </div>
    ),
  },
  {
    accessorKey: "appliedPolicyVersion",
    minSize: 225,
    size: 250,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ポリシー バージョン" />
    ),
    cell: ({ row }) => <div>{row.getValue("appliedPolicyVersion")}</div>,
  },
  {
    accessorKey: "policyCompliant",
    minSize: 180,
    size: 200,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ポリシー 準拠" />
    ),
    cell: ({ row }) => {
      const isCompliant = row.getValue("policyCompliant");
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
    id: "lastStatusReportTime",
    accessorFn: (device) => device.device_config_data.lastStatusReportTime,
    minSize: 150,
    size: 160,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="同期時刻" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("lastStatusReportTime")
            ? formatToJapaneseDateTime(row.getValue("lastStatusReportTime"))
            : "不明"}
        </div>
      );
    },
  },
  {
    id: "lastPolicySyncTime",
    accessorFn: (device) => device.device_config_data.lastPolicySyncTime,
    minSize: 210,
    size: 220,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ポリシー同期時刻" />
    ),
    cell: ({ row }) => {
      return (
        <div>
          {row.getValue("lastPolicySyncTime")
            ? formatToJapaneseDateTime(row.getValue("lastPolicySyncTime"))
            : "不明"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableResizing: false, // リサイズを無効化
    minSize: 50,
    size: 80,
    header: ({ column }) => {
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
  // {
  //   // accessorKey: "UpdateStatue",
  //   accessorKey: "softwareInfo.systemUpdateInfo.updateStatus",
  //   minSize: 100,
  //   size: 300,
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Update Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const updateStatus = updateStatuses.find(
  //       (updateStatus) =>
  //         updateStatus.value ===
  //         row.getValue("softwareInfo.systemUpdateInfo.updateStatus")
  //     );

  //     if (!updateStatus) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {updateStatus.icon && (
  //           <updateStatus.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{updateStatus.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  //   enableColumnFilter: true,
  //   enableHiding: false, //非表示にする機能が無効
  // },
  // {
  //   accessorKey: "softwareInfo.systemUpdateInfo.updateStatus",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="UpdateStatus" />
  //   ),
  //   cell: ({ row }) => {
  //     const updateStatus = row.getValue(
  //       "softwareInfo.systemUpdateInfo.updateStatus"
  //     );
  //     return <div>{updateStatus.toString()}</div>;
  //   },
  // },
];
