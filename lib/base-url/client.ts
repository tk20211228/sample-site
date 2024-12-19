/**
 * ベースURLを取得
 * @param parentUrl? 親フレームURL
 * @returns ベースURL
 */
export const getBaseURL = (parentUrl?: string) => {
  const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
  console.log("isProd", isProd);

  // 本番環境の場合
  if (isProd) {
    const prodUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL; // (ex: myemm.next.work)
    console.log("prodUrl", prodUrl);
    return prodUrl ? prodUrl : `http://localhost:${process.env.PORT || 3000}`;
  }

  // 開発環境でparentFrameUrlが提供されている場合
  if (parentUrl) {
    return parentUrl; // (ex: https://xxxx.ngrok-free.app)
  }

  // 開発環境 URL
  return `http://localhost:${process.env.PORT || 3000}`;
};
