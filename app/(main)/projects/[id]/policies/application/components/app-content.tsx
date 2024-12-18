"use client";

import { Apps, FormPolicy } from "@/app/(main)/types/policy";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useEffect } from "react";
import { usePolicy } from "../../../providers/policy";

import { useParams } from "next/navigation";
import ApplicationLibrary from "./application-library";

import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import PolicyToolBar from "../../components/policy-tool-bar";
import { getApps } from "../data/get-apps";
import AppManagement from "./app-management";

// const defaultSelectedApps: PolicyApps[] = [
//   {
//     packageName: "com.android.chrome",
//     installType: "FORCE_INSTALLED",
//   },
// ];

export default function AppContent() {
  // const [
  //   isPending,
  //   startTransition] = useTransition();

  const {
    currentCreatePolicy,
    // setCurrentCreatePolicy,
    apps,
    setApps,
    policyApps,
    setPolicyApps,
  } = usePolicy();
  const form = useFormContext<FormPolicy>();

  const params = useParams();
  const enterpriseName = `enterprises/${params.id}`;
  // const searchParams = useSearchParams();
  // const policyId = searchParams.get("policyId");
  // const router = useRouter();
  // const pathname = usePathname();
  // const key = `/api/policies/table/${enterpriseName}`;
  // const { addPolicyTableData } = usePoliciesTableData(key, enterpriseName);

  // const handleSave = async () => {
  //   startTransition(async () => {
  //     console.log("currentCreatePolicy", currentCreatePolicy);
  //     const config =
  //       currentCreatePolicy.policy_config_data as AndroidManagementPolicy;
  //     const playStoreMode = "BLACKLIST";
  //     config.playStoreMode = playStoreMode;
  //     if (policyApps.length > 0) {
  //       config.applications = policyApps;
  //     }
  //     console.log("config", config);
  //     if (!policyId) {
  //       toast.error("ポリシーIDが取得できませんでした。");
  //       return;
  //     }
  //     if (!currentCreatePolicy.display_name) {
  //       toast.error("ポリシー名が取得できませんでした。");
  //       return;
  //     }
  //     const policy = await upsertPolicy(
  //       policyId,
  //       currentCreatePolicy.display_name ?? "",
  //       enterpriseName,
  //       config
  //     );
  //     await addPolicyTableData(policy); // テーブルにポリシーを追加,または更新
  //     setCurrentCreatePolicy(currentCreatePolicy);
  //     const policyName = policy.policy_name.split("/")[3];
  //     router.push(`${pathname}/?policyId=${policyName}`);
  //   });
  // };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // console.log("active", active);
    // console.log("over", over);
    if (!active.data.current || !("name" in active.data.current)) return;

    if (
      over &&
      (over.id === "availableApps" ||
        over.id === "restrictedApps" ||
        over.id === "disabledApps")
    ) {
      console.log("over", over);
      const draggedApp = active.data.current as Apps;
      console.log(draggedApp, "draggedApp");

      const packageName = draggedApp.name.split("/")[3];
      const installType =
        over.id === "availableApps"
          ? "FORCE_INSTALLED"
          : over.id === "restrictedApps"
          ? "BLOCKED"
          : "AVAILABLE";
      const disabled = over.id === "disabledApps";
      const newApp = {
        packageName,
        installType,
        disabled,
      };
      // console.log("newApp", newApp);

      // policyAppsに新しいアプリを追加、既存のアプリは更新
      const isExist = policyApps.some((app) => app.packageName === packageName);
      const updatedPolicyApps = isExist
        ? policyApps.map((app) =>
            app.packageName === packageName ? newApp : app
          )
        : [...policyApps, newApp];
      // console.log("updatedPolicyApps", updatedPolicyApps);
      setPolicyApps(updatedPolicyApps);
      form.setValue("policy_config_data.applications", updatedPolicyApps);

      //appsを更新
      const updatedApps = apps.map((app) =>
        app.name === draggedApp.name ? { ...app, installType, disabled } : app
      );
      console.log("updatedApps", updatedApps);
      setApps(updatedApps);
    }
  };

  const policyAppsKey = `policy/apps/${enterpriseName}`;
  // console.log("PolicyAppProvider key", policyAppsKey);
  const { data: appData } = useSWR(
    policyAppsKey,
    () => getApps(enterpriseName),
    {
      dedupingInterval: 3600000, // データの重複を防ぐための間隔
    }
  );
  // console.log("apps", apps);

  useEffect(() => {
    // console.log("form", form.getValues());
    // console.log("currentCreatePolicy", currentCreatePolicy);
    // console.log("apps", apps);
    // console.log("appData", appData);

    // const policyApps = currentCreatePolicy.policy_config_data.applications;
    const policyApps = form.getValues().policy_config_data.applications;
    if (policyApps) {
      const updatedApps = appData?.map((app) => ({
        ...app,
        installType: policyApps.find(
          (policyApp) => policyApp.packageName === app.name.split("/")[3]
        )?.installType,
        disabled: policyApps.find(
          (policyApp) => policyApp.packageName === app.name.split("/")[3]
        )?.disabled,
      }));
      setApps(updatedApps ?? []);
      setPolicyApps(policyApps);
    } else {
      setApps(appData ?? []);
    }
  }, [currentCreatePolicy, appData, form, setPolicyApps, setApps]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <PolicyToolBar />
      <div className="grid grid-cols-2 gap-8 px-4 py-8">
        <ApplicationLibrary />
        <AppManagement />
      </div>
      {/* <div>
        {isPending ? (
          <Button disabled>保存中</Button>
        ) : (
          <Button onClick={handleSave}>保存</Button>
        )}
      </div> */}
    </DndContext>
  );
}
