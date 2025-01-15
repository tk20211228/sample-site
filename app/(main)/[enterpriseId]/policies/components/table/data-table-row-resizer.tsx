import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

interface DataTableRowResizeButtonProps<TData> {
  table: Table<TData>;
}

export default function DataTableRowResizeButton<TData>({
  table,
}: DataTableRowResizeButtonProps<TData>) {
  return (
    <Button
      variant="outline"
      size="sm"
      className="h-8"
      onClick={() => table.toggleDensity()}
    >
      <ArrowUpDown className="h-4 w-4" />
      <span className="ml-2">
        {table.getState().density === "sm"
          ? "小"
          : table.getState().density === "md"
          ? "中"
          : table.getState().density === "lg"
          ? "大"
          : "巨"}
      </span>
    </Button>
  );
}
