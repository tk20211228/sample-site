import { Device } from "@/app/(main)/projects/types/device";

export const createStatusReportDescription = (data: Device) => {
  const deviceId = data.name?.split("/")[3];
  const deviceModel = data.hardwareInfo?.model;
  const appliedState = data.appliedState;
  const policyCompliance = data.policyCompliant ? "◯" : "×";
  const nonComplianceDetails = data.nonComplianceDetails
    ?.map((nonComplianceDetail) => {
      return `${nonComplianceDetail.nonComplianceReason}`;
    })
    .join("\n");

  const description = `
      デバイスID: ${deviceId} のステータスレポートを受信しました
      デバイスモデル：${deviceModel}
      ステータス：${appliedState}
      ポリシー準拠：${policyCompliance}
      ${nonComplianceDetails ? `非準拠詳細：${nonComplianceDetails}` : ""}
      `;
  return description;
};
