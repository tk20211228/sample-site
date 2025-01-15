"use server";

import { createOrRetrieveCustomer } from "@/data/stripe/get-customer";
import { getListPrices } from "@/data/stripe/get-prices";
import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";

export const redirectToCheckout = async (lookupKey: string, url: string) => {
  const prices = await getListPrices([lookupKey]);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: prices.data[0].id,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${url}/plans`,
    cancel_url: `${url}/plans`,
  });
  if (!session.url) {
    throw new Error("セッションURLが見つかりません");
  }

  redirect(session.url);
};

export const redirectToSubscriptionCheckout = async (
  lookupKey: string,
  url: string,
  quantity: number
) => {
  const prices = await getListPrices([lookupKey]);
  const customer = await createOrRetrieveCustomer();
  const session = await stripe.checkout.sessions.create({
    customer,
    billing_address_collection: "auto",
    line_items: [
      {
        price: prices.data[0].id,
        quantity,
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10000,
        },
      },
    ],
    mode: "subscription",
    success_url: `${url}/plans`,
    cancel_url: `${url}/plans`,
  });
  if (!session.url) {
    throw new Error("セッションURLが見つかりません");
  }
  redirect(session.url);
};

export const getPrices = async (
  plans: {
    name: string;
    lookupKey: string;
  }[]
) => {
  const lookupKeys = plans.map((plan) => plan.lookupKey);
  const prices = await stripe.prices.list({
    lookup_keys: lookupKeys,
    active: true,
    expand: ["data.product"],
  });

  return plans.map((plan) => {
    const price = prices.data.find(
      (price) => price.lookup_key === plan.lookupKey
    );

    if (!price) {
      throw new Error(`Price not found: ${plan.lookupKey}`);
    }
    // console.log(price);

    return {
      name: plan.name,
      amount: price.unit_amount!,
      lookupKey: price.lookup_key,
      interval: price.recurring?.interval,
      intervalCount: price.recurring?.interval_count,
    };
  });
  // .filter(Boolean);//　配列から falsy な値（null, undefined, 0, '', false）を除外したい場合はfilterを使う
};

export const redirectToCustomerPortal = async (url: string) => {
  const customer = await createOrRetrieveCustomer();
  const portalSession = await stripe.billingPortal.sessions.create({
    customer,
    return_url: `${url}/plans`,
  });
  if (!portalSession.url) {
    throw new Error("ポータルセッションURLが見つかりません");
  }
  redirect(portalSession.url);
};
