import { formatToJapaneseDateTime } from "@/lib/date-fns/get-date";
import { BatchUsageLogEvents } from "../../../types/event";

export const createUsageLogsDescription = (data: BatchUsageLogEvents) => {
  const usageLogDate = data;
  const deviceId = usageLogDate.device?.split("/")[3];
  const usageLogEvents = usageLogDate.usageLogEvents;

  const events = usageLogEvents?.map((event) => {
    const eventType = event.eventType;

    let eventTime = "不明";
    if (event.eventTime) {
      eventTime = formatToJapaneseDateTime(Date.parse(event.eventTime));
    }
    if (eventType === "LOST_MODE_LOCATION") {
      const lat = event.lostModeLocationEvent?.location?.latitude;
      const lng = event.lostModeLocationEvent?.location?.longitude;
      return `
      デバイスID: ${deviceId}
      取得日時: ${eventTime}
      紛失モード中のデバイスから位置情報を取得しました。
      緯度: ${lat}
      経度: ${lng}
      https://www.google.com/maps/search/?api=1&query=${lat},${lng}
      `;
    }
    if (eventType === "LOST_MODE_OUTGOING_PHONE_CALL") {
      return `
      デバイスID: ${deviceId}
      取得日時: ${eventTime}
      紛失モード中のデバイスから電話発信の操作を検知しました。
      `;
    }

    return `${event.eventType}`;
  });
  const description = events?.join("\n");
  return description ?? "不明なイベントです。";
};
