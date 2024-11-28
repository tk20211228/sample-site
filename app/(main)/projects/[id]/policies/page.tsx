import { getPolicies } from "./actions/policy";
import { policyColumns } from "./components/table/policies-table-columns";
import PoliciesTable from "./components/table/policies-table";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const enterpriseName = `enterprises/${id}`;
  const data = await getPolicies(enterpriseName);
  console.log("Policies data", data);

  return (
    <div className="flex h-dvh">
      <PoliciesTable columns={policyColumns} initialData={data} />
    </div>
  );
}
