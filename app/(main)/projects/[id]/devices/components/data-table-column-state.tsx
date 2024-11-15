import { Row } from "@tanstack/react-table";
import { deviceStates } from "../data/data";
import { HelpCircle } from "lucide-react";

interface DataTableColumnStateProps<TData, TValue> {
  row: Row<TData>;
}

/**
 * デバイスのステータスを表示するコンポーネント
 * @param row - デバイスの行データ
 * @returns
 */
export default function DataTableColumnState<TData, TValue>({
  row,
}: DataTableColumnStateProps<TData, TValue>) {
  const state = deviceStates.find((state) => {
    return state.value === row.getValue("state");
  });

  return state && state.icon ? (
    <div className="flex items-center gap-2">
      <state.icon className="h-4 w-4 text-muted-foreground" />
      <span>{row.getValue("state")}</span>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <HelpCircle className="h-4 w-4 text-muted-foreground" />
      <span>{state?.label}</span>
    </div>
  );
}
