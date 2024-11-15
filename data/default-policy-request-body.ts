import { androidmanagement_v1 } from "googleapis";

export const defaultPolicyRequestBody: androidmanagement_v1.Schema$Policy = {
  // request body parameters
  // https://developers.google.com/android/management/reference/rest/v1/enterprises.policies?hl=ja#PlayStoreMode

  //   "accountTypesWithManagementDisabled": [],
  //   "addUserDisabled": false,
  //   "adjustVolumeDisabled": false,
  advancedSecurityOverrides: {
    developerSettings: "DEVELOPER_SETTINGS_ALLOWED",
  }, // 開発者設定を許可
  //   "alwaysOnVpnPackage": {},
  //   "androidDevicePolicyTracks": [],
  //   "appAutoUpdatePolicy": "my_appAutoUpdatePolicy",
  //   "applications": [],
  //   "autoDateAndTimeZone": "my_autoDateAndTimeZone",
  //   "autoTimeRequired": false,
  //   "blockApplicationsEnabled": false,
  //   "bluetoothConfigDisabled": false,
  //   "bluetoothContactSharingDisabled": false,
  bluetoothDisabled: false, // Bluetooth無効化
  //   "cameraDisabled": false,
  //   "cellBroadcastsConfigDisabled": false,
  //   "choosePrivateKeyRules": [],
  //   "complianceRules": [],
  //   "createWindowsDisabled": false,
  //   "credentialsConfigDisabled": false,
  //   "crossProfilePolicies": {},
  //   "dataRoamingDisabled": false,
  //   "debuggingFeaturesAllowed": false,
  //   "defaultPermissionPolicy": "my_defaultPermissionPolicy",
  //   "deviceOwnerLockScreenInfo": {},
  //   "encryptionPolicy": "my_encryptionPolicy",
  //   "ensureVerifyAppsEnabled": false,
  //   "factoryResetDisabled": false,
  //   "frpAdminEmails": [],
  //   "funDisabled": false,
  //   "installAppsDisabled": false,
  //   "installUnknownSourcesAllowed": false,
  //   "keyguardDisabled": false,
  //   "keyguardDisabledFeatures": [],
  //   "kioskCustomLauncherEnabled": false,
  //   "kioskCustomization": {},
  locationMode: "LOCATION_ENFORCED", // 位置情報モード
  //   "longSupportMessage": {},
  //   "maximumTimeToLock": "my_maximumTimeToLock",
  //   "minimumApiLevel": 0,
  //   "mobileNetworksConfigDisabled": false,
  modifyAccountsDisabled: false, // アカウントの変更を無効化
  mountPhysicalMediaDisabled: false, // 物理メディアのマウントを無効化
  //   "name": "my_name",
  //   "networkEscapeHatchEnabled": false,
  //   "networkResetDisabled": false,
  //   "oncCertificateProviders": [],
  //   "openNetworkConfiguration": {},
  //   "outgoingBeamDisabled": false,
  //   "outgoingCallsDisabled": false,
  //   "passwordPolicies": [],
  //   "passwordRequirements": {},
  //   "permissionGrants": [],
  //   "permittedAccessibilityServices": {},
  //   "permittedInputMethods": {},
  //   "persistentPreferredActivities": [],
  //   "personalUsagePolicies": {},
  playStoreMode: "BLACKLIST", // Google Play ストア モード ポリシーに指定できる値。
  //   "policyEnforcementRules": [],
  //   "privateKeySelectionEnabled": false,
  //   "recommendedGlobalProxy": {},
  //   "removeUserDisabled": false,
  //   "safeBootDisabled": false,
  //   "screenCaptureDisabled": false,
  //   "setUserIconDisabled": false,
  //   "setWallpaperDisabled": false,
  //   "setupActions": [],
  //   "shareLocationDisabled": false,
  //   "shortSupportMessage": {},
  //   "skipFirstUseHintsEnabled": false,
  //   "smsDisabled": false,
  //   "statusBarDisabled": false,
  statusReportingSettings: {
    applicationReportsEnabled: true, // アプリケーションのレポートを有効化
    deviceSettingsEnabled: true, // デバイス設定のレポートを有効化
    softwareInfoEnabled: true, // ソフトウェア情報のレポートを有効化
    memoryInfoEnabled: true, // メモリ情報のレポートを有効化
    networkInfoEnabled: true, // ネットワーク情報のレポートを有効化
    displayInfoEnabled: true, // ディスプレイ情報のレポートを有効化
    powerManagementEventsEnabled: true, // 電源管理イベントのレポートを有効化
    hardwareStatusEnabled: true, // ハードウェアステータスのレポートを有効化
    systemPropertiesEnabled: true, // システムプロパティのレポートを有効化
    applicationReportingSettings: {
      includeRemovedApps: true, // 削除されたアプリケーションを含める
    },
    commonCriteriaModeEnabled: true, // 一般基準モードを有効化
  },
  //   "stayOnPluggedModes": [],
  //   "systemUpdate": {},
  //   "tetheringConfigDisabled": false,
  //   "uninstallAppsDisabled": false,
  //   "unmuteMicrophoneDisabled": false,
  //   "usbFileTransferDisabled": false,
  //   "usbMassStorageEnabled": false,
  //   "version": "my_version",
  //   "vpnConfigDisabled": false,
  //   "wifiConfigDisabled": false,
  //   "wifiConfigsLockdownEnabled": false
};
