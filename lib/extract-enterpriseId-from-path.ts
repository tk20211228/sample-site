import "server-only";

/**
 *
 * @param enterprisesName　enterprises/{enterpriseId} 形式の文字列
 * @returns enterpriseId
 *
 */
export const extractEnterpriseIdFromPath = ({
  enterprisesName,
}: {
  enterprisesName: string;
}) => {
  const enterpriseId = enterprisesName.split("/")[1];
  if (!enterpriseId) {
    throw new Error("enterpriseId is not found");
  }
  return enterpriseId;
};
