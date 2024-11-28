// "use client";

// import { Button } from "@/components/ui/button";
// import { Camera, CameraOff, Loader2Icon } from "lucide-react";
// import { useEffect, useState, useTransition } from "react";
// import { cameraOnOffPolicy } from "../../actions/policy";
// import { androidmanagement_v1 } from "googleapis";

// export default function CameraAccessButton({
//   policy,
// }: {
//   policy: androidmanagement_v1.Schema$Policy;
// }) {
//   const [isPending, startTransition] = useTransition();
//   const [cameraState, setCameraState] = useState<boolean>(false);
//   useEffect(() => {
//     setCameraState(policy.cameraAccess === "CAMERA_ACCESS_USER_CHOICE");
//   }, [policy]);

//   const onClick = async (policyName: string) => {
//     // nullやundefinedでないことを確認
//     if (typeof policyName !== "string") return;

//     startTransition(async () => {
//       if (cameraState) {
//         await cameraOnOffPolicy(policyName, false).then(() => {
//           setCameraState(!cameraState);
//         });
//       } else {
//         await cameraOnOffPolicy(policyName, true).then(() => {
//           setCameraState(!cameraState);
//         });
//       }
//     });
//   };
//   return (
//     <div>
//       {policy.name && (
//         <Button
//           variant="ghost"
//           size="icon"
//           className="text-muted-foreground size-10 transition-all duration-300 hover: hover:text-foreground z-30 "
//           onClick={() => policy.name && onClick(policy.name)}
//         >
//           {isPending ? (
//             <Loader2Icon className=" animate-spin" />
//           ) : cameraState ? (
//             <Camera />
//           ) : (
//             <CameraOff />
//           )}
//         </Button>
//       )}
//     </div>
//   );
// }
