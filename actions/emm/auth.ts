import { google, Auth } from "googleapis";

export function googleServiceAuth() {
  if (process.env.NODE_ENV === "production") {
    const credentials = JSON.parse(
      process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || "{}"
    );

    // 必要なフィールドの存在確認
    if (!credentials.client_email || !credentials.private_key) {
      throw new Error("Required credentials fields are missing");
    }
    const auth: Auth.GoogleAuth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/androidmanagement"],
    });
    return auth;
  } else {
    const auth: Auth.GoogleAuth = new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ["https://www.googleapis.com/auth/androidmanagement"],
    });
    return auth;
  }
}
