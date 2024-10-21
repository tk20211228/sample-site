import { format } from "date-fns";
import { ja } from "date-fns/locale/ja";

export const getSeverDate = () => {
  const date = new Date();
  const now = format(date, "yyyy-MM-dd HH:mm:ss（E）", {
    locale: ja,
  });
  return now;
};
