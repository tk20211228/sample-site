import { z } from "zod";
import { AndroidManagementPolicy, PolicyApps } from "../types/policy";

const advancedSecurityOverridesSchema = z.object({
  untrustedAppsPolicy: z.enum([
    "UNTRUSTED_APPS_POLICY_UNSPECIFIED",
    "DISALLOW_INSTALL",
    "ALLOW_INSTALL_IN_PERSONAL_PROFILE_ONLY",
    "ALLOW_INSTALL_DEVICE_WIDE",
  ]),
  googlePlayProtectVerifyApps: z
    .enum([
      "GOOGLE_PLAY_PROTECT_VERIFY_APPS_UNSPECIFIED",
      "GOOGLE_PLAY_PROTECT_VERIFY_APPS_ALLOWED",
      "GOOGLE_PLAY_PROTECT_VERIFY_APPS_BLOCKED",
    ])
    .optional(),
  developerSettings: z.enum([
    "DEVELOPER_SETTINGS_ALLOWED",
    "DEVELOPER_SETTINGS_BLOCKED",
  ]),
  commonCriteriaMode: z
    .enum([
      "COMMON_CRITERIA_MODE_UNSPECIFIED",
      "COMMON_CRITERIA_MODE_ALLOWED",
      "COMMON_CRITERIA_MODE_BLOCKED",
    ])
    .optional(),
  personalAppsThatCanReadWorkNotifications: z.array(z.string()).optional(),
  mtePolicy: z
    .enum([
      "MTE_POLICY_UNSPECIFIED",
      "MTE_POLICY_ALLOWED",
      "MTE_POLICY_BLOCKED",
    ])
    .optional(),
  contentProtectionPolicy: z
    .enum([
      "CONTENT_PROTECTION_POLICY_UNSPECIFIED",
      "CONTENT_PROTECTION_POLICY_ALLOWED",
      "CONTENT_PROTECTION_POLICY_BLOCKED",
    ])
    .optional(),
});
const statusReportingSettingsSchema = z.object({
  applicationReportsEnabled: z.boolean().default(true),
  deviceSettingsEnabled: z.boolean().default(true),
  softwareInfoEnabled: z.boolean().default(true),
  memoryInfoEnabled: z.boolean().default(true),
  networkInfoEnabled: z.boolean().default(true),
  displayInfoEnabled: z.boolean().default(true),
  powerManagementEventsEnabled: z.boolean().default(true),
  hardwareStatusEnabled: z.boolean().default(true),
  systemPropertiesEnabled: z.boolean().default(true),
  applicationReportingSettings: z.object({
    includeRemovedApps: z.boolean().default(true),
  }),
  commonCriteriaModeEnabled: z.boolean().default(true),
});

export const managedConfigurationTemplateSchema = z
  .object({
    // ManagedConfigurationTemplate の詳細なスキーマが必要な場合は追加
  })
  .optional();

export const permissionGrantSchema = z.object({
  // PermissionGrant の詳細なスキーマが必要な場合は追加
});

export const installConstraintSchema = z.object({
  // InstallConstraint の詳細なスキーマが必要な場合は追加
});

export const extensionConfigSchema = z
  .object({
    // ExtensionConfig の詳細なスキーマが必要な場合は追加
  })
  .optional();

export const applicationsSchema = z.object({
  accessibleTrackIds: z.array(z.string()).nullable().optional(),
  alwaysOnVpnLockdownExemption: z.string().nullable().optional(),
  autoUpdateMode: z.string().nullable().optional(),
  connectedWorkAndPersonalApp: z.string().nullable().optional(),
  credentialProviderPolicy: z.string().nullable().optional(),
  defaultPermissionPolicy: z.string().nullable().optional(),
  delegatedScopes: z.array(z.string()).nullable().optional(),
  disabled: z.boolean().nullable().optional(),
  extensionConfig: extensionConfigSchema.optional(),
  installConstraint: z.array(installConstraintSchema).optional(),
  installPriority: z.number().min(0).max(10000).nullable().optional(),
  installType: z.string().nullable().optional(),
  lockTaskAllowed: z.boolean().nullable().optional(),
  managedConfiguration: z.record(z.any()).nullable().optional(),
  managedConfigurationTemplate: managedConfigurationTemplateSchema,
  minimumVersionCode: z.number().nullable().optional(),
  packageName: z.string().nullable().optional(),
  permissionGrants: z.array(permissionGrantSchema).optional(),
  userControlSettings: z.string().nullable().optional(),
  workProfileWidgets: z.string().nullable().optional(),
}) satisfies z.ZodType<PolicyApps>;

export const policySchema = z.object({
  screenCaptureDisabled: z.boolean().default(false),
  cameraDisabled: z.boolean().default(false),
  advancedSecurityOverrides: advancedSecurityOverridesSchema,
  bluetoothDisabled: z.boolean().default(false),
  locationMode: z.enum(["LOCATION_ENFORCED", "LOCATION_UNSPECIFIED"]),
  modifyAccountsDisabled: z.boolean().default(false),
  mountPhysicalMediaDisabled: z.boolean().default(false),
  playStoreMode: z
    .enum(["BLACKLIST", "WHITELIST", "PLAY_STORE_MODE_UNSPECIFIED"])
    .nullable()
    .optional(),
  statusReportingSettings: statusReportingSettingsSchema,
  applications: z.array(applicationsSchema).optional(),
}) satisfies z.ZodType<AndroidManagementPolicy>;

export const policyDisplayNameSchema = z.object({
  display_name: z
    .string()
    .trim()
    .min(1, "ポリシー名を入力してください。")
    .optional(),
});

export const formPolicySchema = z.object({
  policy_config_data: policySchema,
  display_name: z
    .string()
    .trim()
    .min(1, "ポリシー名を入力してください。")
    .optional(),
});
