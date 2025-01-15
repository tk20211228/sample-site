// "use server";

// import { createOrRetrieveCustomer } from "@/data/stripe";
// import { stripe } from "@/lib/stripe";
// import { redirect } from "next/navigation";

// export const redirectToUsageBasedCheckout = async (
//   lookupKey: string,
//   url: string
// ) => {
//   const prices = await stripe.prices.list({
//     lookup_keys: [lookupKey],
//     expand: ["data.product"],
//   });
//   const customer = await createOrRetrieveCustomer();
//   const session = await stripe.checkout.sessions.create({
//     customer,
//     billing_address_collection: "auto",
//     line_items: [
//       {
//         price: prices.data[0].id,
//       },
//     ],
//     mode: "subscription",
//     success_url: `${url}/setting/billing`,
//     cancel_url: `${url}/setting/billing`,
//   });
//   if (!session.url) {
//     throw new Error("セッションURLが見つかりません");
//   }
//   redirect(session.url);
// };
