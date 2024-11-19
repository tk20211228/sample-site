import { getDevices } from "./actions/devices";
import { deviceColumns } from "./components/columns";
import CreateQrButton from "./components/create-qr-button";
import DeviceTable from "./components/device-table";
import GetDevicesListButton from "./components/get-devices-list-button";
import PoliciesTable from "../policies/components/table/policies-table";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const enterpriseName = `enterprises/${id}`;
  const data = await getDevices(enterpriseName);
  // console.log("getDevices data", data);

  return (
    <div className="flex flex-col h-full p-2">
      <div className="flex">
        <div className="flex flex-row gap-2">
          <GetDevicesListButton enterpriseId={id} />
          <CreateQrButton enterpriseName={enterpriseName} />
        </div>
      </div>
      <div>テーブルヘッダー</div>
      <div className="flex-1 border border-red-500 overflow-auto">
        <DeviceTable columns={deviceColumns} data={data} />
      </div>
      <div>テーブルフッター</div>
    </div>

    //   <div className="flex flex-col h-full p-2">
    //   <div className="flex w-full max-w-full bg-blue-200">test</div>
    //   <div className="flex-1 h-dvh w-full bg-red-300">tese2</div>
    // </div>
  );
}
