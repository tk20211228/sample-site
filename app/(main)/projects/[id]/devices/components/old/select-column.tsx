// import { ColumnDef } from "@tanstack/react-table";

// import { Device } from "../../../../../types/device";
// import { Checkbox } from "@/components/ui/checkbox";

// export const selectColumn: ColumnDef<Device> = {
//   id: "select",
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
//   enableResizing: false,
// };
