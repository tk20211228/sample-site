import { Column } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface DataTableColumnSortHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnSortHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnSortHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="group w-[100px] p-0 m-0 h-8"
      >
        <span className="group-hover:hidden">{title}</span>
        <ArrowUpDown className="size-4 w-[100px] hidden group-hover:block" />
      </Button>
    </div>
  );
}
