import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";

export const getSeverDate = () => {
  const date = new Date();
  const now = format(date, "yyyy-MM-dd HH:mm:ss（E）", {
    locale: ja,
  });
  return now;
};

// APIから取得したタイムスタンプを日本時間に変換
export const formatToJapaneseDateTime = (timestamp: number) => {
  const formattedDate = format(timestamp, "yyyy/MM/dd HH:mm:ss（E）", {
    locale: ja,
  });
  return formattedDate;
};
