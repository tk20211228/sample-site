import { getPolicies } from "./actions/policy";
import GetPolicesListButton from "./components/get-policies-list-button";
import { policyColumns } from "./components/table/columns";
import PoliciesTable from "./components/table/policies-table";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const enterpriseName = `enterprises/${id}`;
  const data = await getPolicies(enterpriseName);
  console.log("Policies data", data);

  return (
    <div className="flex flex-col h-dvh p-2">
      <div>
        テーブルヘッダー
        <GetPolicesListButton enterpriseId={id} />
      </div>
      <PoliciesTable columns={policyColumns} data={data} />
      <div>テーブルフッター</div>
    </div>
  );
}
