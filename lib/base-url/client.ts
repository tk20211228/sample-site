/**
 * ベースURLを取得
 * @param parentUrl? 親フレームURL
 * @returns ベースURL
 */
export const getBaseURL = (parentUrl?: string) => {
  const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

  // 本番環境の場合
  if (isProd) {
    const prodUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL; // (ex: myemm.next.work)
    return prodUrl
      ? `https://${prodUrl}`
      : `http://localhost:${process.env.PORT || 3000}`;
  }

  // 開発環境でparentFrameUrlが提供されている場合
  if (parentUrl) {
    return parentUrl; // (ex: https://xxxx.ngrok-free.app)
  }

  // 開発環境のVercel URL
  const vercelUrl = process.env.VERCEL_URL; // (ex: xxxx.vercel.app)
  return vercelUrl
    ? `https://${vercelUrl}`
    : `http://localhost:${process.env.PORT || 3000}`;
};
