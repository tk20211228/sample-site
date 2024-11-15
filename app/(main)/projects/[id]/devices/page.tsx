import { getDevices } from "./actions/devices";
import { deviceColumns } from "./components/columns";
import DeviceTable from "./components/device-table";

import { AndroidManagementDeviceSchema } from "./types/device";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const enterpriseName = `enterprises/${id}`;
  const data = await getDevices(enterpriseName).then((devices) => {
    // 全てのデバイスを処理する場合
    // 端末のデータをパースして、端末リストを作成してsetDeviceDataにセット
    const deviceList: AndroidManagementDeviceSchema[] = [];
    devices.forEach((device) => {
      const jsonData = device.device_config_data;
      if (!jsonData) return;
      // JSON文字列をパースしてオブジェクトに変換
      const deviceData =
        typeof jsonData === "string"
          ? (JSON.parse(jsonData) as AndroidManagementDeviceSchema)
          : (jsonData as AndroidManagementDeviceSchema);
      deviceList.push(deviceData);
    });
    return deviceList;
  });

  return (
    <div>
      <div className="container mx-auto">
        <DeviceTable columns={deviceColumns} data={data} enterpriseId={id} />
      </div>
    </div>
  );
}
