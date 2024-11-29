import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";

// APIから取得したタイムスタンプを日本時間に変換
export const formatToJapaneseDateTime = (timestamp: number = Date.now()) => {
  const formattedDate = format(timestamp, "yyyy/MM/dd HH:mm:ss（E）", {
    locale: ja,
  });
  return formattedDate;
};
// APIから取得したタイムスタンプを日本時間に変換
export const formatToJapaneseDate = (timestamp: number = Date.now()) => {
  const formattedDate = format(timestamp, "yyyy年MM月dd日(E)", {
    locale: ja,
  });
  return formattedDate;
};
