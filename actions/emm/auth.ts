import { google, Auth } from "googleapis";

export function googleServiceAuth() {
  if (process.env.NODE_ENV === "production") {
    const auth: Auth.GoogleAuth = new google.auth.GoogleAuth({
      credentials: JSON.parse(
        process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || "{}"
      ),
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
