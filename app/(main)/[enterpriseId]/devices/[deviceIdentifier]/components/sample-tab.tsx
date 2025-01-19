import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function SampleTabBar({ className }: { className: string }) {
  return (
    <Tabs defaultValue="account" className={cn("w-[400px]", className)}>
      <TabsList className="mt-1.5 ml-2">
        <TabsTrigger value="hardware">ハードウェア情報</TabsTrigger>
        <TabsTrigger value="software">ソフトウェア情報</TabsTrigger>
        <TabsTrigger value="application">アプリケーションレポート</TabsTrigger>
        <TabsTrigger value="policy">ポリシー情報</TabsTrigger>
        <TabsTrigger value="network">ネットワーク情報</TabsTrigger>
        <TabsTrigger value="security">セキュリティ情報</TabsTrigger>
        <TabsTrigger value="log">ログ</TabsTrigger>
      </TabsList>
      <TabsContent value="account">ハードウェア情報</TabsContent>
      <TabsContent value="software">パスワード</TabsContent>
      <TabsContent value="application">アプリケーションレポート</TabsContent>
      <TabsContent value="policy">ポリシー情報</TabsContent>
      <TabsContent value="network">ネットワーク情報</TabsContent>
      <TabsContent value="security">セキュリティ情報</TabsContent>
      <TabsContent value="log">ログ</TabsContent>
    </Tabs>
  );
}
