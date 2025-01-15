// "use client";

// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   VisibilityState,
//   getCoreRowModel,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import { useState } from "react";
// import { ResizeColumnProvider } from "../../providers/policies-table";
// import { PolicyTableType } from "../types/policy";
// import TableContent from "./table-content-old";

// interface DataTableProps<TData extends PolicyTableType, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   initialData: TData[];
// }

// export default function PoliciesTable<TData extends PolicyTableType, TValue>({
//   columns,
//   initialData,
// }: DataTableProps<TData, TValue>) {
//   const [sorting, setSorting] = useState<SortingState>([]); // ソート状態を管理
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]); // カラムフィルタリングの状態を管理
//   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({}); // カラムの可視性を管理
//   const [rowSelection, setRowSelection] = useState({}); // 行の選択状態を管理

//   const table = useReactTable({
//     data: initialData,
//     columns,
//     columnResizeMode: "onChange", // リアルタイムで列のリサイズを行う
//     enableColumnResizing: true, // カラムのリサイズを有効化
//     onStateChange: () => {}, // 状態変更時の処理
//     getCoreRowModel: getCoreRowModel(), // コア行モデルを取得
//     getPaginationRowModel: getPaginationRowModel(), // ページネーション行モデルを取得
//     onSortingChange: setSorting, // ソート状態が変更されたときの処理
//     getSortedRowModel: getSortedRowModel(), // ソートされた行モデルを取得
//     onColumnFiltersChange: setColumnFilters, // カラムフィルタリング状態が変更されたときの処理
//     getFilteredRowModel: getFilteredRowModel(), // フィルタリングされた行モデルを取得
//     onColumnVisibilityChange: setColumnVisibility, // カラムの可視性が変更されたときの処理
//     onRowSelectionChange: setRowSelection, // 行の選択状態が変更されたときの処理
//     getFacetedRowModel: getFacetedRowModel(), // ファセットされた行モデルを取得
//     getFacetedUniqueValues: getFacetedUniqueValues(), // ファセットされたユニークな値を取得

//     state: {
//       sorting, // ソート状態
//       columnFilters, // カラムフィルタリング状態
//       columnVisibility, // カラムの可視性
//       rowSelection, // 行の選択状態
//     },
//     initialState: {
//       pagination: {
//         pageSize: 50, // デフォルトのページサイズ
//       },
//     },
//   });

//   return (
//     <ResizeColumnProvider table={table}>
//       <TableContent table={table} columns={columns} />
//     </ResizeColumnProvider>
//   );
// }
