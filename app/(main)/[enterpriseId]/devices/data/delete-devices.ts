"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { deleteManagedDevice } from "./delete-device";

export const deleteApp = async (appName: string) => {
  const supabase = await createClient();
  const { error } = await supabase.from("apps").delete().eq("name", appName);
  if (error) {
    throw new Error(error.message);
  }
  return error;
};

/**
 * 選択したデバイスを削除
 * @param deviceNames
 * @returns
 */
export const deleteSelectedDevices = async ({
  enterpriseId,
  deleteDeviceIdentifiers,
  wipeDataFlags = ["WIPE_DATA_FLAG_UNSPECIFIED"],
}: {
  enterpriseId: string;
  deleteDeviceIdentifiers: string[];
  wipeDataFlags: string[];
}) => {
  // 認証
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("ユーザーが認証されていません");
  }
  // 一台づつ、Google EMM APIでデバイスを削除したのち、DBから削除
  await Promise.all(
    deleteDeviceIdentifiers.map((deleteDeviceIdentifier) => {
      return deleteManagedDevice({
        enterpriseId,
        deleteDeviceIdentifier,
        wipeDataFlags,
      });
    })
  ).catch((error) => {
    console.error("Error Delete device:", error.message);
  });
  revalidatePath(`/${enterpriseId}/devices`);
};

/**
 * 単一デバイスを削除
 * @param deviceName デバイス名
 * @param wipeDataFlags データ削除フラグ
 */
export const deleteDevice = async ({
  enterpriseId,
  deleteDeviceIdentifier,
  wipeDataFlags,
}: {
  enterpriseId: string;
  deleteDeviceIdentifier: string;
  wipeDataFlags: string[];
}) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("ユーザーが認証されていません");

  // Google EMM APIでデバイスを削除
  await deleteManagedDevice({
    enterpriseId,
    deleteDeviceIdentifier,
    wipeDataFlags,
  }).catch((error) => {
    console.error("Error Delete device:", error.message);
  });
  revalidatePath(`/${enterpriseId}/devices`);
};
