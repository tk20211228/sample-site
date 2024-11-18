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
  getFilteredRowModel, // フィルタリング
  getPaginationRowModel, // ページネーション
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

import { Button } from "@/components/ui/button";

import { getDevices } from "@/app/(main)/device/data/device";
import { androidmanagement_v1 } from "googleapis";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DeviceTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const tableRef = useRef<HTMLTableElement>(null);
  const [sorting, setSorting] = useState<SortingState>([]); // ソート状態を管理
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // カラムフィルタリングの状態を管理
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({}); // カラムの可視性を管理
  const [rowSelection, setRowSelection] = useState({}); // 行の選択状態を管理

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: "onChange", // リアルタイムで列のリサイズを行う
    enableColumnResizing: true, // カラムのリサイズを有効化
    onStateChange: () => {
      // const info = table.getState().columnSizing;
      // // リサイズ時に差分を再計算
      // if (tableRef.current) {
      //   const currentWidth = tableRef.current.clientWidth;
      //   const totalColumnWidth = table.getCenterTotalSize();
      //   setDiffWidth(currentWidth - totalColumnWidth);
      // }
      // console.log("stateChange", info);
      // TODO: DBに保存する処理を追加予定
    }, // 状態変更時の処理

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
  });

  type Device = androidmanagement_v1.Schema$Device;
  const [isPending, startTransition] = useTransition();
  const [devices, setDevices] = useState<Device[]>([]);
  const searchParams = useSearchParams();
  const enterprises_name = searchParams.get("enterprises_name");
  const handleClick = async () => {
    startTransition(async () => {
      if (enterprises_name) {
        const data = await getDevices(enterprises_name);
        console.log(devices);
        setDevices(data.devices || []);
      }
    });
  };

  // const width = tableRef.current?.style.width;

  // const [diffWidth, setDiffWidth] = useState(0);
  // useEffect(() => {
  //   if (tableRef.current) {
  //     const width = tableRef.current.clientWidth;
  //     const totalColumnWidth = table.getCenterTotalSize();
  //     const diffWidth = width - totalColumnWidth;
  //     setDiffWidth(diffWidth);
  //   }
  // }, [table, width]);
  // console.log("diffWidth", diffWidth);

  return (
    <div>
      <div className="pb-2">
        <Button
          variant="outline"
          className="w-40"
          onClick={handleClick}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className=" animate-spin" />
              取得中...
            </>
          ) : (
            "デバイス一覧を取得"
          )}
        </Button>
      </div>
      <div className="pb-4">
        <DataTableToolbar table={table} />
      </div>
      <div
        ref={tableRef}
        className="rounded-md border w-full max-w-full overflow-auto"
      >
        <Table style={{ width: table.getCenterTotalSize() }}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="group" key={headerGroup.id}>
                {headerGroup.headers.map((header, index, array) => {
                  return (
                    <TableHead
                      className="relative border-r last:border-r-0"
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{ width: `${header.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.columnDef.enableResizing !== false && (
                        <div
                          className="absolute inset-y-0 -right-2 w-4 cursor-col-resize z-10"
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          style={{
                            userSelect: "none",
                            touchAction: "none",
                          }}
                        >
                          <span className="sr-only">リサイズハンドラー</span>
                        </div>
                      )}
                      {array.length - 1 === index && (
                        <div
                          className="absolute transition-colors left-full top-0 -bottom-px group-hover:bg-muted/50 border-b"
                          // style={{
                          //   width: `${
                          //     (tableRef.current?.clientWidth || 0) -
                          //     table.getCenterTotalSize()
                          //   }px`,
                          // }}
                        />
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
                    <TableCell key={cell.id} className="relative">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      {/* 最後のセルの場合は、ボーダーを表示. 一番下の行の場合は、ボーダーを表示しない */}
                      {array.length - 1 === index &&
                        row.index !== table.getRowModel().rows.length - 1 && (
                          <div
                            className="absolute transition-colors left-full top-0 -bottom-px group-hover:bg-muted/50 border-b"
                            //   style={{
                            //     width: `${diffWidth}px`,
                            //   }}
                          />
                        )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-2">
        <DataTablePagination table={table} />
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          前へ
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          次へ
        </Button>
      </div>
    </div>
  );
}
