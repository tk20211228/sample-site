import { DeviceOperation } from "../../../types/device";

/**
 * 'COMMAND'を受信した場合のメッセージを作成する
 * @param data デバイスのコマンドデータ
 * @returns 通知に使用するメッセージ
 */
export const createCommandDescription = (data: DeviceOperation) => {
  const operationDate = data as DeviceOperation;
  const deviceId = operationDate.name?.split("/")[3];
  const type = operationDate.metadata?.type;
  let status = "不明";
  if (type === "START_LOST_MODE") {
    const lostModeStatus = operationDate.metadata?.startLostModeStatus.status;
    switch (lostModeStatus) {
      case "SUCCESS":
        status = "デバイスを紛失モードに設定しました。";
        break;
      case "RESET_PASSWORD_RECENTLY":
        status =
          "過去 12 時間以内にパスワードをリセットされたため、デバイスを紛失モードに設定できませんでした。";
        break;
      case "RESET_PASSWORD_NOT_RECENTLY":
        status =
          "過去 12 時間以内に管理者により、パスワードがリセットされたため、デバイスを紛失モードに設定できませんでした。";
        break;
      case "USER_EXIT_LOST_MODE_RECENTLY":
        status =
          "過去 12 時間以内にユーザーが紛失モードを解除したため、デバイスを紛失モードに設定できませんでした。";
        break;
      case "ALREADY_IN_LOST_MODE":
        status = "デバイスはすでに紛失モードに設定されています。";
        break;
      default:
        status = "不明なステータスです。";
    }
  } else if (type === "STOP_LOST_MODE") {
    const stopLostModeStatus =
      operationDate.metadata?.stopLostModeStatus.status;
    switch (stopLostModeStatus) {
      case "SUCCESS":
        status = "デバイスの紛失モードを解除されました。";
        break;
      case "NOT_IN_LOST_MODE":
        status = "デバイスは紛失モードに設定されていません。";
        break;
      default:
        status = "不明なステータスです。";
    }
  }
  const description = `
      コマンドを受信しました。
      デバイスID: ${deviceId} 
      コマンドタイプ：${type}
      ステータス：${status}
      `;
  return description;
};
