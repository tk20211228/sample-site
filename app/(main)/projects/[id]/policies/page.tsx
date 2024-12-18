import PolicyTableContent from "./components/policy-table-content";

export default function Page() {
  // サーバーサイドでデータを取得する場合
  // props: { params: Promise<{ id: string }> }
  // const params = await props.params;
  // const { id } = params;
  // const enterpriseName = `enterprises/${id}`;
  // const data = await getPoliciesTableData(enterpriseName);
  // console.log("Policies data", data);

  return (
    <div className="flex h-dvh">
      {/* <PoliciesTable columns={policyColumns} initialData={data} /> */}
      <PolicyTableContent />
    </div>
  );
}
