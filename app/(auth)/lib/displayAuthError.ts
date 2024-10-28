import { getSeverDate } from "@/lib/date-fns/get-date";
import {
  getSupabaseAuthErrorMessage,
  SupabaseAuthErrorCode,
} from "../data/supabase-error-code-ja";

// export const displayAuthError = (error: unknown) => {
//   const now = getSeverDate();
//   if (error instanceof Error) {
//     const errorCode = error.message as SupabaseAuthErrorCode;
//     const errorMessage = getSupabaseAuthErrorMessage(errorCode);
//     if (errorMessage) {
//       alert(errorMessage);
//     } else {
//       alert(`
//         未知のエラーが発生しました。
//         システム管理者に連絡してください。
//         code: ${errorCode}
//         日時: ${now}`);
//     }
//   } else {
//     console.error("予期せぬエラー:", error);
//     alert(`
//       予期せぬエラーが発生しました。
//       システム管理者に連絡してください。
//       日時: ${now}`);
//   }
// };
export const authErrorMessage = async (
  errorCode: SupabaseAuthErrorCode
): Promise<string> => {
  const now = getSeverDate();
  const errorMessage = await getSupabaseAuthErrorMessage(errorCode);
  if (errorMessage) {
    return errorMessage;
  } else {
    return `
      未知のエラーが発生しました。
      システム管理者に連絡してください。
      code: ${errorCode}
      日時: ${now}`;
  }
};
