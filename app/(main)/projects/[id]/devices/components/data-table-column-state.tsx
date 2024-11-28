import { Row } from "@tanstack/react-table";
import { deviceStates } from "../data/data";
import { HelpCircle } from "lucide-react";

interface DataTableColumnStateProps<TData> {
  row: Row<TData>;
}

/**
 * デバイスのステータスを表示するコンポーネント
 * @param row - デバイスの行データ
 * @returns
 */
export default function DataTableColumnState<TData>({
  row,
}: DataTableColumnStateProps<TData>) {
  const state = deviceStates.find((state) => {
    return state.value === row.getValue("state");
  });

  return state ? (
    <div className="flex items-center justify-center gap-2">
      <state.icon className={`size-5 ${state.color} `} />
      <span className={state.color}>{state.label}</span>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <HelpCircle className="text-muted-foreground justify-center size-5" />
      <span className="text-muted-foreground">{row.getValue("state")}</span>
    </div>
  );
}
