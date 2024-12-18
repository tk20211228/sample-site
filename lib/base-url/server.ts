/**
 * ベースURLを取得
 * @param parentUrl? 親フレームURL
 * @returns ベースURL
 */
export const getBaseSubscriptionURL = () => {
  try {
    const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
    const url = isProd
      ? process.env.VERCEL_PROJECT_PRODUCTION_URL
      : process.env.PUBSUB_SUBSCRIPTION_PUSH_URL;

    return url;
  } catch (error) {
    console.error("Failed to get base subscription URL", error);
    throw new Error("Failed to get base subscription URL");
  }
};
