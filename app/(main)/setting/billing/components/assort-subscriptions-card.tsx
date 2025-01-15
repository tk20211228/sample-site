import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function AssortSubscriptionsCard() {
  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      <Card className="py-8 border-blue-700/50 rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-blue-700">コンテンツ</CardTitle>
        </CardHeader>
      </Card>
      <Card className="py-8 border-blue-700/50 rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-blue-700">セキュリティ</CardTitle>
        </CardHeader>
      </Card>
      <Card className="py-8 border-blue-700/50 rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-blue-700">キッティング</CardTitle>
        </CardHeader>
      </Card>
      <Card className="py-8 border-blue-700/50 rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-blue-700">サイネージ</CardTitle>
        </CardHeader>
      </Card>
      <Card className="py-8 border-blue-700/50 rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-blue-700">スマートレジ</CardTitle>
        </CardHeader>
      </Card>
      <Card className="py-8 border-blue-700/50 rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-blue-700">連絡先共有</CardTitle>
        </CardHeader>
      </Card>
      <Card className="py-8 border-blue-700/50 rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-blue-700">安心サポート</CardTitle>
        </CardHeader>
      </Card>
      <Card className="py-8 border-blue-700/50 rounded-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-blue-700">Beta版</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
