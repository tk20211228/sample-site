import { Button } from "@/components/ui/button";
import { getPolicies } from "./actions/policy";
import SyncPoliciesButton from "./components/sync-policies-button";
import { policyColumns } from "./components/table/columns";
import PoliciesTable from "./components/table/policies-table";
import Link from "next/link";
import SelectDeletePoliciesButton from "../components/select-delete-policies-button";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const enterpriseName = `enterprises/${id}`;
  const data = await getPolicies(enterpriseName);
  console.log("Policies data", data);

  return (
    <div className="flex flex-col h-dvh p-1 border rounded-lg">
      <div className="flex-1 overflow-hidden border rounded-lg">
        <PoliciesTable columns={policyColumns} initialData={data} />
      </div>
    </div>
  );
}
