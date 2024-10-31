import { google, Auth } from "googleapis";

export function googleServiceAuth() {
  // const auth = new google.auth.GoogleAuth({
  const auth: Auth.GoogleAuth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
    scopes: ["https://www.googleapis.com/auth/androidmanagement"],
  });
  return auth;
}
