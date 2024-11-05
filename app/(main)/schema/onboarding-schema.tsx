import { z } from "zod";

export const onboardingSchema = z.object({
  projectName: z
    // 記号は許容しない
    .string()
    .trim()
    .min(1, { message: "プロジェクト名を入力してください" })
    .regex(/^[^!@#$%^&*(),.?":{}|<>]+$/, {
      message: '記号（!@#$%^&*(),.?":{}|<>）は使用できません',
    })
    .max(100, { message: "プロジェクト名は100文字以内で入力してください" }),
  organizationName: z
    .string()
    .trim()
    .min(1, { message: "組織名を入力してください" })
    .max(100, { message: "組織名は100文字以内で入力してください" }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "利用規約に同意してください",
  }),
});
