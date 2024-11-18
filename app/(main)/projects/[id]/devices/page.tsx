import { getDevices } from "./actions/devices";
import { deviceColumns } from "./components/columns";
import DeviceTable from "./components/device-table";
import GetDevicesListButton from "./components/get-devices-list-button";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const enterpriseName = `enterprises/${id}`;
  const data = await getDevices(enterpriseName);
  console.log("getDevices data", data);

  return (
    <div className="flex flex-col px-2 py-4 h-full">
      <GetDevicesListButton enterpriseId={id} />
      <DeviceTable columns={deviceColumns} data={data} />
    </div>
  );
}
