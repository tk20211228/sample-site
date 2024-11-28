"use client";

import {
  ColumnDef, // フィルタリング
  SortingState, // 可視性
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel, // ソート
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table-resizing";

import { DensityFeature } from "@/app/(main)/projects/types/density";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { PublicAppsTableToolbar } from "./public-apps-table-toolbar";

import { PublicAppsTableType } from "@/app/(main)/types/apps";
import { usePublicApps } from "../../../../providers/public-apps";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  initialData: TData[];
}

export default function PublicAppsTable<TData, TValue>({
  columns,
  initialData,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]); // ソート状態を管理
  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // カラムフィルタリングの状態を管理
  // const [rowSelection, setRowSelection] = useState({}); // 行の選択状態を管理

  const { publicAppsTableData, setPublicAppsTableData } = usePublicApps();

  // 初回レンダリング時にinitialDataをセット
  useEffect(() => {
    if (initialData && publicAppsTableData.length === 0) {
      setPublicAppsTableData(initialData as PublicAppsTableType[]);
    }
  }, [initialData, setPublicAppsTableData, publicAppsTableData.length]);

  const table = useReactTable({
    data: publicAppsTableData as TData[],
    columns,
    columnResizeMode: "onChange", // リアルタイムで列のリサイズを行う
    enableColumnResizing: true, // カラムのリサイズを有効化
    onStateChange: () => {}, // 状態変更時の処理
    getCoreRowModel: getCoreRowModel(), // コア行モデルを取得
    getPaginationRowModel: getPaginationRowModel(), // ページネーション行モデルを取得
    onSortingChange: setSorting, // ソート状態が変更されたときの処理
    getSortedRowModel: getSortedRowModel(), // ソートされた行モデルを取得
    // onColumnFiltersChange: setColumnFilters, // カラムフィルタリング状態が変更されたときの処理
    // getFilteredRowModel: getFilteredRowModel(), // フィルタリングされた行モデルを取得
    // onRowSelectionChange: setRowSelection, // 行の選択状態が変更されたときの処理
    _features: [DensityFeature], // 行の密度を管理する機能を追加
    state: {
      sorting, // ソート状態
      // columnFilters, // カラムフィルタリング状態
      // rowSelection, // 行の選択状態
    },
    initialState: {
      pagination: {
        pageSize: 20, // デフォルトのページサイズ
      },
    },
  });

  return (
    <div className="flex flex-col h-full w-full max-w-full p-1">
      <PublicAppsTableToolbar table={table} className="pb-1" />
      <Table
        style={{ width: table.getCenterTotalSize() }}
        className={cn(
          "bg-background",
          // "p-1",
          "border-separate border-spacing-0" // セルの境界を分離し、あとでボーダーを重ねる
        )}
      >
        <TableHeader className="z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className={cn(
                      "sticky top-0",
                      "border-b z-10 bg-background border-l",
                      "[&:nth-child(2)]:border-l-0", // 2番目のセルの左ボーダーを削除
                      "first:sticky first:left-0 first:z-30 first:border-l-0 first:border-r",
                      "last:sticky  last:right-0 last:z-30 last:border-r",
                      "p-1"
                    )}
                    key={header.id}
                    colSpan={header.colSpan}
                    style={{ width: `${header.getSize()}px` }}
                  >
                    {header.column.columnDef.enableResizing !== false && (
                      <div
                        className={cn(
                          "absolute inset-y-0 -right-2",
                          "w-4 cursor-col-resize z-30" // 幅を狭く
                        )}
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        onDoubleClick={() => header.column.resetSize()} // ダブルクリックで自動リサイズ
                        style={{
                          userSelect: "none",
                          touchAction: "none",
                        }}
                      >
                        <span className="sr-only">リサイズハンドラー</span>
                      </div>
                    )}
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="group"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "relative",
                      "whitespace-nowrap overflow-hidden",
                      "border-b",
                      "first:sticky first:left-0 first:z-10 first:bg-background first:border-r",
                      "last:sticky last:right-0 last:z-10 last:bg-background last:border-r last:border-l",

                      "p-0"
                    )}
                    style={{ maxWidth: `${cell.column.getSize()}px` }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                データがありません。
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <PoliciesTablePagination table={table} className="pt-1" /> */}
    </div>
  );
}