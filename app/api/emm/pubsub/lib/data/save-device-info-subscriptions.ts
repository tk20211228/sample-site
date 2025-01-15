import "server-only";

import { createAdminClient } from "@/lib/supabase/admin";

export const saveDeviceInfoSubscriptions = async (enterpriseId: string) => {
  const supabase = createAdminClient();
  // まず owner_id を取得
  const { data: enterpriseData, error: enterpriseError } = await supabase
    .from("enterprises")
    .select("owner_id")
    .eq("enterprise_id", enterpriseId)
    .single();

  console.log("saveDeviceInfoSubscriptions", enterpriseData);

  if (enterpriseError) throw enterpriseError;
  if (!enterpriseData) throw new Error("Enterprise not found");

  // デバイス数を集計
  const { count, error: countError } = await supabase
    .from("devices")
    .select("*", { count: "exact", head: true })
    .eq("enterprise_id", enterpriseId);

  console.log("saveDeviceInfoSubscriptions", count);

  if (countError) throw countError;
  if (count === null) throw new Error("Failed to count devices");

  //enterpriseIdでenterprisesテーブルとsubscriptionテーブルを結合して、subscription.plan_configに合計のデバイスを記録
  const { error: subscriptionsError } = await supabase
    .from("subscriptions")
    .update({
      plan_config: {
        usage: {
          devices: {
            total: count,
            active: count,
            inactive: 0,
          },
        },
      },
    })
    .eq("owner_id", enterpriseData.owner_id);
  if (subscriptionsError) {
    console.error(subscriptionsError);
    return;
  }
};
