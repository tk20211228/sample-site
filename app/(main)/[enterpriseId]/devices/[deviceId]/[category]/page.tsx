import { TabsContent } from "@/components/ui/tabs";
import { notFound } from "next/navigation";
import { CategoryProvider } from "../components/category-provider";
import { RouteParams } from "@/app/types/enterprise";
import {
  CATEGORIES,
  CATEGORY_NAMES,
  CategoryType,
} from "../../data/categories";

export default async function Page({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  // URLパラメータのバリデーション
  if (!CATEGORIES.includes((await params).category as CategoryType)) {
    notFound();
  }

  const categoryName = CATEGORY_NAMES[(await params).category as CategoryType];

  return (
    <div>
      <CategoryProvider className="hidden lg:block">
        <TabsContent value="hardware">ハードウェア情報</TabsContent>
        <TabsContent value="software">ソフトウエア情報</TabsContent>
        <TabsContent value="application">アプリケーションレポート</TabsContent>
        <TabsContent value="policy">ポリシー情報</TabsContent>
        <TabsContent value="network">ネットワーク情報</TabsContent>
        <TabsContent value="security">セキュリティ情報</TabsContent>
        <TabsContent value="log">ログ</TabsContent>
      </CategoryProvider>
      <div className="lg:hidden">{categoryName}</div>
    </div>
  );
}
