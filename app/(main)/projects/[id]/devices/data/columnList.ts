import { TableColumnDefinition } from "../../../types/column";

export const devicesTableColumnList: TableColumnDefinition[] = [
  {
    accessorKey: "device_name",
    title: "端末名",
    minSize: 200,
    size: 250,
  },
  {
    accessorKey: "policy_name",
    title: "ポリシー名",
    minSize: 200,
    size: 200,
  },
  // {
  //   accessorKey: "state",
  //   title: "State",
  //   minSize: 100,
  //   size: 150,
  // },
];
