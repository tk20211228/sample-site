import { createAdminClient } from "@/lib/supabase/admin";
import { sendDiscordWebhookMessage } from "@/lib/webhook/discord";
import { Json } from "@/types/database";
import { OAuth2Client } from "google-auth-library";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { Device, DeviceOperation } from "../../types/device";
import { getBaseSubscriptionURL } from "@/lib/base-url/server";
import { createCommandDescription } from "./lib/command";
import { createUsageLogsDescription } from "./lib/usage-logs";
import { BatchUsageLogEvents } from "../../types/event";
import { createStatusReportDescription } from "./lib/status-report";

// Pub/Subメッセージの型定義
interface PubSubMessage {
  message: {
    data: string;
    attributes: {
      notificationType: string;
    };
    messageId: string;
    message_id: string;
    publishTime: string;
    publish_time: string;
  };
  subscription: string;
}

/**
 * Pub/Subのトークンを検証する
 * @param request
 * @returns トークンの検証結果
 */
async function verifyPubSubToken() {
  const authHeader = (await headers()).get("authorization");
  // スキーム部分とトークン部分を分離
  const [scheme, token] = authHeader?.split(" ") ?? [];
  if (scheme !== "Bearer" || !token) {
    throw new Error("Invalid authorization header format");
  }
  const baseSubscriptionURL = getBaseSubscriptionURL();
  const audience = `${baseSubscriptionURL}/api/emm/pubsub`;
  // console.log("Audience:", audience);

  // OAuth2クライアントの初期化
  const authClient = new OAuth2Client();
  try {
    // トークンの検証
    const ticket = await authClient.verifyIdToken({
      idToken: token,
      audience, // プッシュエンドポイントのURL
    });

    const claim = ticket.getPayload();
    if (!claim) throw new Error("Invalid claim");

    // Pub/Subサービスアカウントの検証
    const expectedServiceAccount =
      process.env.PUBSUB_SUBSCRIPTION_AUTH_SERVICE_ACCOUNT;
    // console.log("claim.email", claim.email);
    console.log("expectedServiceAccount", expectedServiceAccount);
    if (claim.email !== expectedServiceAccount) {
      throw new Error("Invalid service account");
    } else if (claim.email === expectedServiceAccount) {
      console.log("Pub/Sub service account is valid");
    }

    return claim;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error("Invalid token");
  }
}

/**
 * Pub/Subのメッセージを受信する
 * @param request
 * @returns メッセージの受信結果
 */
export async function POST(request: Request) {
  try {
    // トークンの検証
    await verifyPubSubToken();

    const body: PubSubMessage = await request.json();
    // Base64でエンコードされたデータをデコード
    const decodedData = Buffer.from(body.message.data, "base64").toString();
    const data = JSON.parse(decodedData);
    const supabase = createAdminClient();
    let deviceName = "不明";
    if (body.message.attributes.notificationType === "COMMAND") {
      // "name": "enterprises/LC0283n6ru/devices/3dddfe1a76fb9492/operations/1734680584437", から"enterprises/LC0283n6ru/devices/3dddfe1a76fb9492"のみを取得
      deviceName = data.name?.split("/operations/")[0];
    } else if (body.message.attributes.notificationType === "USAGE_LOGS") {
      deviceName = data.device;
    } else if (
      body.message.attributes.notificationType === "STATUS_REPORT" ||
      body.message.attributes.notificationType === "ENROLLMENT"
    ) {
      deviceName = data.name;
    }

    const { error } = await supabase.from("pubsub_logs").insert({
      message_id: body.message.messageId,
      publish_time: body.message.publishTime,
      attributes_data: body.message.attributes as Json,
      message_data: data as Json,
      device_name: deviceName,
    });
    if (error) throw error;

    const notificationType = body.message.attributes.notificationType;

    let description = "";

    // デバイスのステータスレポート取得時、デバイス登録時のメッセージ
    if (
      notificationType === "STATUS_REPORT" ||
      notificationType === "ENROLLMENT"
    ) {
      description = createStatusReportDescription(data as Device);
    }

    // デバイスのコマンド取得時のメッセージ
    if (notificationType === "COMMAND") {
      description = createCommandDescription(data as DeviceOperation);
    }
    if (notificationType === "USAGE_LOGS") {
      description = createUsageLogsDescription(data as BatchUsageLogEvents);
    }

    const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
    const contentTitle = isProd ? "" : "【開発環境】";

    await sendDiscordWebhookMessage(
      `${contentTitle}Pub/Subメッセージを受信しました`,
      notificationType,
      description
    );

    // 成功レスポンス(ステータスコード200)を返す
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: unknown) {
    console.error("エラー:", error);
    await sendDiscordWebhookMessage(
      "Pub/Subメッセージのデータ処理に失敗しました。",
      "ERROR",
      error instanceof Error ? error.message : "不明なエラーが発生しました"
    );
    // エラーの場合は再試行されるよう4xxではなく500を返す
    return NextResponse.json(
      { error: "データ処理に失敗しました。" },
      { status: 202 }
    );
  }
}
