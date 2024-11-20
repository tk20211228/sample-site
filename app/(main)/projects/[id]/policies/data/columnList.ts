import { TableColumnDefinition } from "../../../types/column";

export const policiesTableColumnList: TableColumnDefinition[] = [
  {
    accessorKey: "policy_name",
    title: "ポリシー名",
    minSize: 200,
    size: 250,
  },
  {
    accessorKey: "policy_version",
    title: "ポリシーバージョン",
    minSize: 200,
    size: 250,
  },
  {
    accessorKey: "created_at",
    title: "作成日時",
    minSize: 200,
    size: 250,
  },
  {
    accessorKey: "updated_at",
    title: "更新日時",
    minSize: 200,
    size: 250,
  },
];
