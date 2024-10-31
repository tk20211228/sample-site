"use server";

import { androidmanagement_v1, google } from "googleapis";
import { redirect } from "next/navigation";
import { googleServiceAuth } from "./auth";

export const signupUrl = async () => {
  const auth = googleServiceAuth();
  const androidmanagement: androidmanagement_v1.Androidmanagement =
    google.androidmanagement({
      version: "v1",
      auth,
    });
  try {
    const res = await androidmanagement.signupUrls.create({
      callbackUrl: process.env.EMM_SIGNUP_URL,
      projectId: process.env.EMM_PROJECT_ID,
    });
    console.log(res.data);
    if (res.data.url) {
      redirect(res.data.url);
    }
  } catch (error) {
    console.error("Error creating signup URL:", error);
    throw error;
  }
};

export const signupUrl1 = async () => {
  const auth = googleServiceAuth();
  const androidmanagement: androidmanagement_v1.Androidmanagement =
    google.androidmanagement({
      version: "v1",
      auth,
    });
  await androidmanagement.signupUrls
    .create({
      callbackUrl: process.env.EMM_SIGNUP_URL,
      projectId: process.env.EMM_PROJECT_ID,
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.url) {
        redirect(res.data.url);
      }
    })
    .catch((error) => {
      if (error.message === "NEXT_REDIRECT") {
        return;
      }
      console.error("Error creating signup URL:", error.message);
      throw new Error(error.message);
    });
};

export const signupUrl2 = async () => {
  const auth = googleServiceAuth();
  const androidmanagement: androidmanagement_v1.Androidmanagement =
    google.androidmanagement({
      version: "v1",
      auth,
    });
  const { data } = await androidmanagement.signupUrls
    .create({
      callbackUrl: process.env.EMM_SIGNUP_URL,
      projectId: process.env.EMM_PROJECT_ID,
    })
    .catch((error) => {
      console.error("Error creating signup URL:", error.message);
      throw new Error(error.message);
    });
  console.log("data", data);
  console.log("data.url", data.url);
  console.log("data.name", data.name);
  return data.url;
};
