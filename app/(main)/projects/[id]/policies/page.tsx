import { Button } from "@/components/ui/button";
import { getPolicies } from "./actions/policy";
import GetPolicesListButton from "./components/get-policies-list-button";
import { policyColumns } from "./components/table/columns";
import PoliciesTable from "./components/table/policies-table";
import Link from "next/link";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const enterpriseName = `enterprises/${id}`;
  const data = await getPolicies(enterpriseName);
  console.log("Policies data", data);

  return (
    <div className="flex flex-col h-dvh p-2">
      <div className="flex flex-row gap-2">
        テーブルヘッダー
        <GetPolicesListButton enterpriseId={id} data={data} />
        <Button asChild>
          <Link href={`/projects/${id}/policies/general`}>ポリシー作成</Link>
        </Button>
      </div>
      <div className="flex-1 overflow-hidden border rounded-lg">
        <PoliciesTable columns={policyColumns} initialData={data} />
      </div>
      <div>テーブルフッター</div>
    </div>
  );
}
