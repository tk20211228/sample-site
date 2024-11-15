import { Card, CardContent, CardHeader } from "@/components/ui/card";
import AppsIframe from "./apps-iframe";

export default function AppsManagement() {
  return (
    <Card>
      <CardHeader>
        <h2>アプリ管理</h2>
      </CardHeader>
      <CardContent>
        <AppsIframe />
      </CardContent>
    </Card>
  );
}
