"use client";

import {
  ColumnDef,
  ColumnFiltersState, // フィルタリング
  SortingState, // ソート
  VisibilityState, // 可視性
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
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

import { useMemo, useRef, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { cn } from "@/lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DeviceTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]); // ソート状態を管理
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // カラムフィルタリングの状態を管理
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({}); // カラムの可視性を管理
  const [rowSelection, setRowSelection] = useState({}); // 行の選択状態を管理

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange", // リアルタイムで列のリサイズを行う
    enableColumnResizing: true, // カラムのリサイズを有効化
    onStateChange: () => {}, // 状態変更時の処理

    getCoreRowModel: getCoreRowModel(), // コア行モデルを取得
    getPaginationRowModel: getPaginationRowModel(), // ページネーション行モデルを取得
    onSortingChange: setSorting, // ソート状態が変更されたときの処理
    getSortedRowModel: getSortedRowModel(), // ソートされた行モデルを取得
    onColumnFiltersChange: setColumnFilters, // カラムフィルタリング状態が変更されたときの処理
    getFilteredRowModel: getFilteredRowModel(), // フィルタリングされた行モデルを取得
    onColumnVisibilityChange: setColumnVisibility, // カラムの可視性が変更されたときの処理
    onRowSelectionChange: setRowSelection, // 行の選択状態が変更されたときの処理
    getFacetedRowModel: getFacetedRowModel(), // ファセットされた行モデルを取得
    getFacetedUniqueValues: getFacetedUniqueValues(), // ファセットされたユニークな値を取得

    state: {
      sorting, // ソート状態
      columnFilters, // カラムフィルタリング状態
      columnVisibility, // カラムの可視性
      rowSelection, // 行の選択状態
    },
    initialState: {
      pagination: {
        pageSize: 50, // デフォルトのページサイズ
      },
    },
  });
  // カラムごとの最大文字数を計算する関数をメモ化
  const calculateMaxColumnWidth = useMemo(
    () => (columnId: string) => {
      // console.log("columnId", columnId);
      // columnsの定義からデフォルトサイズを取得
      const columnDef = table.getColumn(columnId)?.columnDef;
      const defaultSize = columnDef?.size ?? 200;
      // console.log("defaultSize", defaultSize);

      // 文字種別ごとの幅を計算
      const getCharWidth = (char: string): number => {
        if (
          /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf]/.test(
            char
          )
        ) {
          return 20; // 日本語文字（漢字、ひらがな、カタカナ）
        } else if (/[A-Z]/.test(char)) {
          return 12; // 英大文字
        } else if (/[a-z0-9]/.test(char)) {
          return 8; // 英小文字と数字
        }
        return 8; // その他の文字
      };

      // セルの内容の最大幅を計算
      const maxContentWidth = table.getRowModel().rows.reduce((max, row) => {
        const cell = row
          .getAllCells()
          .find((cell) => cell.column.id === columnId);
        const content = cell?.getValue()?.toString() ?? "";
        const width = Array.from(content).reduce(
          (sum, char) => sum + getCharWidth(char),
          0
        );
        return Math.max(max, width);
      }, 0);
      console.log("maxContentWidth", maxContentWidth);

      const padding = 0;
      const contentBasedWidth = maxContentWidth + padding;
      console.log("contentBasedWidth", contentBasedWidth);
      // デフォルトサイズとコンテンツベースのサイズを比較して大きい方を採用
      const maxWidth = Math.max(defaultSize, contentBasedWidth);
      console.log("maxWidth", maxWidth);
      return maxWidth;
    },
    [table]
  ); // tableインスタンスが変更されたときのみ再計算

  // カラムの自動リサイズ処理をメモ化
  const autoResizeColumn = useMemo(
    () => (columnId: string) => {
      const newWidth = calculateMaxColumnWidth(columnId);
      const column = table.getColumn(columnId);
      if (column) {
        table.setColumnSizing((prev) => ({
          ...prev,
          [columnId]: newWidth,
        }));
      }
    },
    [calculateMaxColumnWidth, table]
  );

  // autoResizeAllColumns 関数を追加
  const autoResizeAllColumns = useMemo(
    () => () => {
      table.getAllColumns().forEach((column) => {
        if (column.id) {
          autoResizeColumn(column.id);
        }
      });
    },
    [autoResizeColumn, table]
  );

  return (
    <div className="flex flex-col h-full">
      {/* <div className="pb-4">
        <DataTableToolbar table={table} />
      </div>
      <div className="flex justify-end p-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => autoResizeAllColumns()}
        >
          全カラムを自動リサイズ
        </Button>
      </div> */}
      <Table
        style={{ width: table.getCenterTotalSize() }}
        className={cn(
          "bg-background w-full",
          "border-separate border-spacing-0" // セルの境界を分離し、あとでボーダーを重ねる
        )}
      >
        <TableHeader className="z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="group" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className={cn(
                      "sticky top-0",
                      "border-b z-10 bg-background border-l",
                      "[&:nth-child(2)]:border-l-0", // 2番目のセルの左ボーダーを削除
                      "first:sticky first:left-0 first:z-30 first:border-l-0 first:border-r",
                      "last:sticky  last:right-0 last:z-30 last:border-r-0"
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
                        onDoubleClick={() => autoResizeColumn(header.id)} // ダブルクリックで自動リサイズ
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
                {row.getVisibleCells().map((cell, index, array) => (
                  <TableCell
                    key={cell.id}
                    className={cn(
                      "relative",
                      "whitespace-nowrap overflow-hidden",
                      "border-b",
                      "first:sticky first:left-0 first:z-10 first:bg-background first:border-r",
                      "last:sticky last:right-0 last:z-10 last:bg-background last:border-r last:border-l"
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
      {/* </div> */}
      {/* <div className="mt-2">
        <DataTablePagination table={table} />
      </div> */}
    </div>
  );
}
