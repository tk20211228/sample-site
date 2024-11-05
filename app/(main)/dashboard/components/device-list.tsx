"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import DeviceTable from "./device-table";

export default function DeviceList() {
  const searchParams = useSearchParams();
  const enterprises_name = searchParams.get("enterprises_name");

  return (
    <Card>
      <CardHeader>
        <h2>端末一覧</h2>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 pt-2">{enterprises_name}</div>
        <DeviceTable parent={enterprises_name} />
      </CardContent>
    </Card>
  );
}
