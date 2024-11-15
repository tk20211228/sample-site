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

export const statuses = [
  {
    value: "pending",
    label: "Pending",
    icon: Circle,
  },
  {
    value: "processing",
    label: "Processing",
    icon: Clock,
  },
  {
    value: "success",
    label: "Success",
    icon: CheckCircle,
  },
  {
    value: "failed",
    label: "Failed",
    icon: XCircle,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUp,
  },
];
