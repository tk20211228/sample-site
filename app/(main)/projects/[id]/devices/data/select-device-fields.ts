export const selectDevicesTableFields = `
  id,
  device_name,
  display_name,
  policy_name,
  device_config_data->>state,
  device_config_data->>lastSyncTime,
  device_config_data->>policyCompliant,
  device_config_data->>enrollmentTime,
  device_config_data->>lastStatusReportTime,
  created_at,
  updated_at
`;
