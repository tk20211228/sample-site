import { stripe } from "@/lib/stripe";

export const redirectToCheckout = async (lookupKey: string) => {
  const price = await stripe.prices.list({
    lookup_keys: [lookupKey],
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: price.data[0].id,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "https://example.com/success",
    cancel_url: "https://example.com/cancel",
  });

  return session.url;
};
