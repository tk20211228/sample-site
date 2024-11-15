import { columns, deviceColumns } from "./components/columns";
import DeviceTable from "./components/device-table";

import { fetchMockPayments } from "./data/mock-payment-data";

export default async function Page() {
  const data = await fetchMockPayments();

  return (
    <div>
      <div className="container mx-auto">
        <DeviceTable columns={columns} data={data} />
      </div>
    </div>
  );
}
