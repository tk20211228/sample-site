import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  CircleOff,
  Clock,
  HelpCircle,
  Timer,
  XCircle,
} from "lucide-react";

// export const labels = [
//   {
//     value: "bug",
//     label: "Bug",
//   },
//   {
//     value: "feature",
//     label: "Feature",
//   },
//   {
//     value: "documentation",
//     label: "Documentation",
//   },
// ];

/**
 * デバイスのステータス
 * https://developers.google.com/android/management/reference/rest/v1/enterprises.devices?hl=ja#DeviceState
 */
export const deviceStates = [
  {
    value: "UNSPECIFIED",
    label: "Unspecified",
    icon: HelpCircle,
  },
  {
    value: "ACTIVE",
    label: "Active",
    icon: CheckCircle,
  },
  {
    value: "DISABLED",
    label: "Disabled",
    icon: CircleOff,
  },
  {
    value: "DELETED",
    label: "Deleted",
    icon: XCircle,
  },
  {
    value: "PROVISIONING",
    label: "Provisioning",
    icon: Timer,
  },
  {
    value: "LOST",
    label: "Lost",
    icon: HelpCircle,
  },
  {
    value: "PREPARING_FOR_MIGRATION",
    label: "Preparing for Migration",
    icon: Clock,
  },
  {
    value: "DEACTIVATED_BY_DEVICE_FINANCE",
    label: "Deactivated (Finance)",
    icon: CircleOff,
  },
];

/**
 * デバイスのアップデートステータス
 * https://developers.google.com/android/management/reference/rest/v1/enterprises.devices
 */
export const updateStatuses = [
  {
    value: "UPDATE_STATUS_UNKNOWN",
    label: "Unknown",
    icon: HelpCircle,
    description: "保留中のシステム アップデートの状態が不明",
  },
  {
    value: "UP_TO_DATE",
    label: "Up to Date",
    icon: CheckCircle,
    description: "利用可能なアップデートなし",
  },
  {
    value: "UNKNOWN_UPDATE_AVAILABLE",
    label: "Update Available (Type Unknown)",
    icon: Clock,
    description: "不明なタイプのアップデートが利用可能",
  },
  {
    value: "SECURITY_UPDATE_AVAILABLE",
    label: "Security Update Available",
    icon: Timer,
    description: "セキュリティアップデートが利用可能",
  },
  {
    value: "OS_UPDATE_AVAILABLE",
    label: "OS Update Available",
    icon: Timer,
    description: "OSアップデートが利用可能",
  },
];

// export const statuses = [
//   {
//     value: "pending",
//     label: "Pending",
//     icon: Circle,
//   },
//   {
//     value: "processing",
//     label: "Processing",
//     icon: Clock,
//   },
//   {
//     value: "success",
//     label: "Success",
//     icon: CheckCircle,
//   },
//   {
//     value: "failed",
//     label: "Failed",
//     icon: XCircle,
//   },
// ];

// export const priorities = [
//   {
//     label: "Low",
//     value: "low",
//     icon: ArrowDown,
//   },
//   {
//     label: "Medium",
//     value: "medium",
//     icon: ArrowRight,
//   },
//   {
//     label: "High",
//     value: "high",
//     icon: ArrowUp,
//   },
// ];
