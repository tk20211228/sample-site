import { Card, CardContent, CardHeader } from "@/components/ui/card";
import DeviceTable from "./device-table";

export default function DeviceList() {
  return (
    <Card>
      <CardHeader>
        <h2>デバイス一覧</h2>
      </CardHeader>
      <CardContent>
        <DeviceTable />
      </CardContent>
    </Card>
  );
}
