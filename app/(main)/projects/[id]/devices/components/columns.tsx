"use client";

import { ColumnDef } from "@tanstack/react-table";

import {
  ArrowUpDown,
  CheckCircle,
  MoreHorizontal,
  XCircle,
} from "lucide-react"; // 行アクション

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "./data-table-column-header";
import DataTableColumnState from "./data-table-column-state";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  priority: "low" | "medium" | "high";
  email: string;
};

type Device = {
  name?: string | null | undefined;
  state?: string | null | undefined;
  policyName?: string | null | undefined;
  appliedPolicyVersion?: string | null | undefined;
  policyCompliant?: boolean | null | undefined;
  lastStatusReportTime?: string | null | undefined;
  lastPolicySyncTime?: string | null | undefined;

  softwareInfo?: {
    systemUpdateInfo?: {
      updateStatus?: string | null | undefined;
    };
  };
};

export const deviceColumns: ColumnDef<Device>[] = [
  {
    accessorKey: "name",
    minSize: 100,
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="端末名" />
    ),
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "state",
    minSize: 100,
    size: 150,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="State" />
    ),
    cell: ({ row }) => {
      return <DataTableColumnState row={row} />;
    },
  },
  {
    accessorKey: "policyName",
    minSize: 100,
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ポリシー名" />
    ),
    cell: ({ row }) => <div>{row.getValue("policyName")}</div>,
  },
  {
    accessorKey: "appliedPolicyVersion",
    minSize: 100,
    size: 150,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ポリシー バージョン" />
    ),
    cell: ({ row }) => <div>{row.getValue("appliedPolicyVersion")}</div>,
  },
  {
    accessorKey: "policyCompliant",
    minSize: 100,
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ポリシー 準拠" />
    ),
    cell: ({ row }) => {
      const isCompliant = row.getValue("policyCompliant");
      return (
        <div className="flex items-center justify-center">
          {isCompliant === true ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : isCompliant === false ? (
            <XCircle className="h-5 w-5 text-red-500" />
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: "lastStatusReportTime",
    minSize: 100,
    size: 150,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Status Report Time" />
    ),
    cell: ({ row }) => <div>{row.getValue("lastStatusReportTime")}</div>,
  },
  {
    accessorKey: "lastPolicySyncTime",
    minSize: 100,
    size: 150,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Policy Sync Time" />
    ),
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

export const columns: ColumnDef<Payment>[] = [
  // {
  //   id: "select",
  //   enableResizing: false, // リサイズを無効化
  //   minSize: 50,
  //   size: 50,
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "status",
  //   minSize: 100,
  //   size: 100,
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("status")
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {status.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },

  // {
  //   accessorKey: "priority",
  //   minSize: 100,
  //   size: 300,
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Priority" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority")
  //     );

  //     if (!priority) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  //   enableColumnFilter: true,
  //   enableHiding: false, //非表示にする機能が無効
  // },
  {
    accessorKey: "email",
    minSize: 200,
    size: 300,
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    minSize: 100,
    size: 300,
    header: () => (
      <div className="flex items-center justify-center">Amount</div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableResizing: false, // リサイズを無効化
    minSize: 50,
    size: 100,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
