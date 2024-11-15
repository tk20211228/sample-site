import { columns } from "./components/columns";
import DeviceTable from "./components/device-table";

import { fetchMockPayments } from "./data/mock-payment-data";

export default async function Page() {
  const data = await fetchMockPayments();
  return (
    <div>
      <h1>デバイステーブル</h1>
      <div className="container mx-auto py-10">
        <DeviceTable columns={columns} data={data} />
      </div>
    </div>
  );
}
