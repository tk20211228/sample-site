export const selectAppFields = `
  app_details->>name,
  app_details->>title,
  app_details->>iconUrl,
  app_details->>updateTime,
  app_details->>minAndroidSdkVersion,
  app_details->>playStoreUrl,
  appType:app_type,
  app_details->>distributionChannel,
  created_at,
  updated_at
`;
