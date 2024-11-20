import { getDevices } from "./actions/devices";
import { deviceColumns } from "./components/columns";
import CreateQrButton from "./components/create-qr-button";
import DeviceTable from "./components/device-table";
import GetDevicesListButton from "./components/get-devices-list-button";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const enterpriseName = `enterprises/${id}`;
  const data = await getDevices(enterpriseName);
  console.log("getDevices data", data);

  return (
    <div className="flex flex-col h-dvh p-2">
      <div className="flex gap-2">
        <GetDevicesListButton enterpriseId={id} />
        <CreateQrButton enterpriseName={enterpriseName} />
      </div>

      <div>テーブルヘッダー</div>
      <div className="flex-1 overflow-hidden border rounded-lg">
        <DeviceTable columns={deviceColumns} data={data} />
      </div>

      <div>テーブルフッター</div>
    </div>
  );
}
