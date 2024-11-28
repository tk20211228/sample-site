// "use server";

// import { createClient } from "@/lib/supabase/server";
// import { androidmanagement_v1 } from "googleapis";
// import { cameraOffPolicyRequestBody } from "../data/CameraOffPolicyRequestBody";
// import { cameraOnPolicyRequestBody } from "../data/CameraOnPolicyRequestBody";
// import { createAndroidManagementClient } from "@/actions/emm/client";

// export const cameraOnOffPolicy = async (name: string, mode: boolean) => {
//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   if (!user) {
//     throw new Error("User not found");
//   }
//   let requestBody: androidmanagement_v1.Schema$Policy;

//   if (mode) {
//     requestBody = cameraOnPolicyRequestBody;
//   } else {
//     requestBody = cameraOffPolicyRequestBody;
//   }
//   const androidmanagement = await createAndroidManagementClient();
//   const { data } = await androidmanagement.enterprises.policies
//     .patch({
//       name,
//       requestBody,
//     })
//     .catch((error) => {
//       console.error("Error cameraOnOffPolicy failed:", error.message);
//       throw new Error(error.message);
//     });
//   console.log("data", data);
//   if (!data) {
//     throw new Error("cameraOnOffPolicy failed");
//   }
//   console.log("cameraOnOffPolicy created:", data);
// };
