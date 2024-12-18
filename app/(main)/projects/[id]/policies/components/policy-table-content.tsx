"use client";

import { useParams } from "next/navigation";
import { PoliciesTableProvider } from "./policies-table-provider";
import PoliciesTable from "./table/policy-table";
import { policyColumns } from "./table/policies-table-columns";
import { usePoliciesTableData } from "../../apps/data/use-policies-table";

export default function PolicyTableContent() {
  const params = useParams();
  const enterpriseName = `enterprises/${params.id}`;
  // const data = await getPoliciesTableData(enterpriseName);
  const key = `/api/policies/table/${enterpriseName}`;
  const { policyFormData, isLoading, isError } = usePoliciesTableData(
    key,
    enterpriseName
  );
  console.log("Policies data", policyFormData);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  if (!policyFormData) return <div>No data</div>;

  return (
    <PoliciesTableProvider columns={policyColumns} initialData={policyFormData}>
      <PoliciesTable columns={policyColumns} />
    </PoliciesTableProvider>
  );
}
