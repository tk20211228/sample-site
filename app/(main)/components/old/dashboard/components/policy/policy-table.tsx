// "use client";

// import { getPolicies } from "@/actions/emm/get-policy";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { androidmanagement_v1 } from "googleapis";
// import { Loader2Icon } from "lucide-react";
// import { useSearchParams } from "next/navigation";
// import { useState, useTransition } from "react";
// import CameraAccessButton from "./camera-access-button";
// import CreatePolicyDialog from "./create-policy-dialog";
// import PolicyMenuButton from "./policy-menu-button";

// type Policy = androidmanagement_v1.Schema$Policy;

// export default function PolicyTable() {
//   const [isPending, startTransition] = useTransition();
//   const [policies, setPolicies] = useState<Policy[]>([]);
//   const searchParams = useSearchParams();
//   const enterprises_name = searchParams.get("enterprises_name");

//   const handleClick = async () => {
//     startTransition(async () => {
//       if (enterprises_name) {
//         const data = await getPolicies(enterprises_name);
//         console.log(data);
//         setPolicies(data.policies || []);
//       }
//     });
//     /**
//      * policies: [
//           {
//             name: 'enterprises/LC0283n6ru/policies/first-policy',
//             version: '8',
//             locationMode: 'LOCATION_ENFORCED',
//             playStoreMode: 'BLACKLIST',
//             advancedSecurityOverrides: [Object],
//             cameraAccess: 'CAMERA_ACCESS_USER_CHOICE'
//           }
//         ]
//      */
//   };
//   return (
//     <div>
//       <div className="flex flex-row gap-2 border-b-2 border-gray-200 pb-2">
//         <Button
//           variant="outline"
//           className="w-40"
//           onClick={handleClick}
//           disabled={isPending}
//         >
//           {isPending ? (
//             <>
//               <Loader2Icon className=" animate-spin" />
//               取得中...
//             </>
//           ) : (
//             "ポリシー一覧を取得"
//           )}
//         </Button>
//       </div>
//       <Table>
//         <TableCaption>
//           <div className="flex">{enterprises_name}</div>
//         </TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-1/12">No.</TableHead>
//             <TableHead className="w-7/12">ポリシー名</TableHead>
//             <TableHead className="w-2/12">バージョン</TableHead>
//             <TableHead className="w-2/12">備考</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {policies.map((policy, index) => (
//             <TableRow key={policy.name}>
//               <TableCell className="font-medium">{index + 1}</TableCell>
//               <TableCell>{policy.name?.split("/").pop() ?? "不明"}</TableCell>
//               <TableCell>{policy.version ?? "不明"}</TableCell>
//               <TableCell className="flex gap-2">
//                 {policy && <CameraAccessButton policy={policy} />}
//                 {enterprises_name && <PolicyMenuButton policy={policy} />}
//               </TableCell>
//             </TableRow>
//           ))}
//           <TableRow>
//             {enterprises_name && (
//               <TableCell colSpan={4}>
//                 <div className="relative h-10 flex justify-center">
//                   <CreatePolicyDialog parent={enterprises_name} />
//                 </div>
//               </TableCell>
//             )}
//           </TableRow>
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
