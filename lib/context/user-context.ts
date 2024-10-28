import { headers } from "next/headers";
import IPinfoWrapper from "node-ipinfo";

const ipinfoClient = new IPinfoWrapper(process.env.IPINFO_TOKEN || "");

export type UserContextData = {
  ip_address: string;
  location: string;
  timezone?: string;
  city?: string;
  country?: string;
};

/**
 * IPアドレスから位置情報などのユーザーコンテキストデータを取得
 * IPアドレスを指定しない場合、自動的にリクエスト元のIPアドレス情報を返す
 */
export async function getUserContextData(): Promise<UserContextData> {
  try {
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0] : undefined;
    // console.log("IP address:", ip);
    if (!ip) {
      throw new Error("IP address is required");
    }
    const ipData = await ipinfoClient.lookupIp(ip);
    console.log("IP data:", ipData);
    console.log("ip_address:", `${ipData.city}, ${ipData.country}`);
    console.log("location:", ipData.timezone);

    return {
      ip_address: ipData.ip || "unknown",
      location:
        ipData.city || ipData.country
          ? `${ipData.city}, ${ipData.country}`
          : "unknown",
      timezone: ipData.timezone || "UTC",
    };
  } catch (error) {
    console.error("Failed to fetch user context data:", error);
    return {
      ip_address: "unknown",
      location: "unknown",
      timezone: "UTC",
    };
  }
}
