"use client";

import { Apps, FormPolicy } from "@/app/types/policy";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useEffect } from "react";

import ApplicationLibrary from "./application-library";

import { useFormContext } from "react-hook-form";
import { usePolicyForm } from "../../../../providers/policy-form-provider";
import AppManagement from "./app-management";

export default function AppContent({ appData }: { appData: Apps[] }) {
  const { apps, setApps, policyApps, setPolicyApps } = usePolicyForm();
  // console.log("apps", apps);
  // console.log("policyApps", policyApps);

  const form = useFormContext<FormPolicy>();
  // const { policyData } = form.getValues();
  // const [currentCreatePolicy, setCurrentCreatePolicy] = useState(policyData);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    // console.log("active", active);
    // console.log("over", over);
    // console.log("policyApps", policyApps);
    if (!active.data.current || !("appId" in active.data.current)) return;

    if (
      over &&
      (over.id === "availableApps" ||
        over.id === "restrictedApps" ||
        over.id === "disabledApps")
    ) {
      console.log("over", over);
      const draggedApp = active.data.current as Apps;
      console.log(draggedApp, "draggedApp");

      const packageName = draggedApp.appId;
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
      form.setValue("policyData.applications", updatedPolicyApps);

      //appsを更新
      const updatedApps = apps.map((app) =>
        app.appId === draggedApp.appId ? { ...app, installType, disabled } : app
      );
      console.log("updatedApps", updatedApps);
      setApps(updatedApps);
    }
  };

  useEffect(() => {
    const policyApps = form.getValues().policyData.applications;
    if (policyApps) {
      const updatedApps = appData?.map((app) => ({
        ...app,
        installType: policyApps.find(
          (policyApp) => policyApp.packageName === app.appId
        )?.installType,
        disabled: policyApps.find(
          (policyApp) => policyApp.packageName === app.appId
        )?.disabled,
      }));
      setApps(updatedApps ?? []);
      setPolicyApps(policyApps);
      // console.log("policyApps", policyApps);
    } else {
      setApps(appData ?? []);
    }
  }, [setApps, appData, setPolicyApps, form]);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-2 gap-8 px-4 py-8">
        <ApplicationLibrary />
        <AppManagement />
      </div>
    </DndContext>
  );
}
