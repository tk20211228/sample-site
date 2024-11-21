import { ColumnDef } from "@tanstack/react-table";
import { TableColumnDefinition } from "../../../types/column";
import { DataTableColumnHeader } from "../../../[id]/devices/components/data-table-column-header";
import { DataTableColumnSortHeader } from "../../../[id]/policies/components/table/data-table-column-sort-header";

export function generateSortColumns<T>(
  devicesTableColumnList: TableColumnDefinition[]
): ColumnDef<T>[] {
  return devicesTableColumnList.map((def) => ({
    accessorKey: def.accessorKey,
    minSize: def.minSize,
    size: def.size,
    maxSize: def.maxSize,
    header: ({ column }) => (
      <DataTableColumnSortHeader column={column} title={def.title} />
    ),
    cell: ({ row }) => {
      const value = row.getValue(def.accessorKey);
      const formattedValue:= def.formatter ? def.formatter(value) : value;
      return (
        <div 
          className="truncate flex items-center justify-center"
          title={String(value)}
        >
          {formattedValue}
        </div>
      );
  }));
}
