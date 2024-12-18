import { androidmanagement_v1 } from "googleapis";

export type Enterprise = androidmanagement_v1.Schema$Enterprise;

export type enabledNotificationTypes =
  | "NOTIFICATION_TYPE_UNSPECIFIED" // この値は無視されます。
  | "ENROLLMENT" //デバイスが登録されたときに送信される通知。
  | "STATUS_REPORT" //デバイスがステータス レポートを発行したときに送信される通知。
  | "COMMAND" //デバイス コマンドが完了すると送信される通知。
  | "USAGE_LOGS"; //デバイスが BatchUsageLogEvents を送信したときに送信される通知。
