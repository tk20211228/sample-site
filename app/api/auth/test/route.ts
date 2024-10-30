import { getSeverDate } from "@/lib/date-fns/get-date";
// import { chromium } from "@playwright/test";
import { chromium } from "playwright";
import { expect } from "playwright/test";

export const dynamic = "force-dynamic"; // static by default, unless reading the request
const date = getSeverDate();

/**
 *
 * @param request
 * @returns
 *
 * 参考URL：https://playwright.dev/docs/api/class-browser
 *
 */
export async function GET(request: Request) {
  const userAgent = request.headers.get("user-agent") || "unknown";
  const browser = await chromium.launch();
  console.log(browser);
  const page = await browser.newPage();
  const webhookUrl =
    "https://discord.com/api/webhooks/1301066368807997471/8fkfLfnh70XW28HrZ64GLsTwG1ArQdQDOMMhbiArzrtDVkuNGlfbRVl5bQ6AOTFcddqL";
  try {
    // await page.goto("https://example.com");
    // // 画面をスクショし、ファイル名に日付を入れる
    // const date = new Date();
    // const fileName = `${date.getFullYear()}${
    //   date.getMonth() + 1
    // }${date.getDate()}.png`; // 月は0から始まるので+1
    // await page.screenshot({ path: fileName });
    // Discordにスクショを送信する
    // const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL; // 環境変数からWebhook URLを取得
    // const formData = new FormData();
    // formData.append('file', fs.createReadStream(fileName));
    // await fetch(discordWebhookUrl, {
    //   method: 'POST',
    //   body: formData,
    // });

    await page.goto("https://sample-site-pearl.vercel.app/");
    await page.getByRole("button", { name: "サインイン" }).click();
    await page
      .getByLabel("メールアドレス or ユーザー名")
      .fill("kubokidev@gmail.com");
    await page.locator('input[name="password"]').fill("testTEST123!!");
    await page.getByRole("button", { name: "ログイン" }).click();
    const checkUrl = new RegExp(`.*\/welcome`);
    await expect(page).toHaveURL(checkUrl);
    await expect(
      page.getByRole("heading", { name: "ようこそ！" })
    ).toBeVisible();

    const message = `${date}/ログインtest成功`;

    // discordに通知
    if (webhookUrl) {
      await sendDiscordNotification(webhookUrl, message);
    }
  } catch (error) {
    console.error(error);
    const message = `${date}/ログインtest失敗/${error}`;
    // discordに通知
    // const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    const webhookUrl =
      "https://discord.com/api/webhooks/1301066368807997471/8fkfLfnh70XW28HrZ64GLsTwG1ArQdQDOMMhbiArzrtDVkuNGlfbRVl5bQ6AOTFcddqL";
    if (webhookUrl) {
      await sendDiscordNotification(webhookUrl, message);
    }
  } finally {
    await browser.close(); // ブラウザを閉じる
    return new Response(JSON.stringify({ message: "success", userAgent }), {
      status: 200,
    });
  }
}

async function sendDiscordNotification(webhookUrl: string, message: string) {
  await fetch(webhookUrl, {
    method: "POST",
    body: JSON.stringify({ content: message }),
  });
}
