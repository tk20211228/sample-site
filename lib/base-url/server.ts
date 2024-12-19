/**
 * ベースURLを取得
 * @param parentUrl? 親フレームURL
 * @returns ベースURL
 */
export const getBaseSubscriptionURL = () => {
  try {
    const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
    const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL; // (ex: xxxx.vercel.app)
    const url = isProd
      ? `https://${vercelUrl}`
      : process.env.PUBSUB_SUBSCRIPTION_PUSH_URL;

    return url;
  } catch (error) {
    console.error("Failed to get base subscription URL", error);
    throw new Error("Failed to get base subscription URL");
  }
};
