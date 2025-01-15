import { getBaseURL } from "@/lib/base-url/client";
import AddOptionSubscriptionsCard from "./components/add-option-subscriptions-card";
import AssortSubscriptionsCard from "./components/assort-subscriptions-card";
import MainSubscriptionsCard from "./components/main-subscriptions-card";
import { getPrices } from "./actions/stripe";

export default async function Page() {
  const mainPrices = await getPrices(main);
  const optionPrices = await getPrices(options);
  const url = getBaseURL();
  return (
    <div className="container mx-auto mt-4 px-4 pb-20 lg:mt-6">
      <MainSubscriptionsCard url={url} prices={mainPrices} />
      <AddOptionSubscriptionsCard prices={optionPrices} />
      <AssortSubscriptionsCard />
    </div>
  );
}

const main = [
  {
    name: "管理デバイス ライセンス",
    lookupKey: "license",
  },
];

const options = [
  {
    name: "ライト",
    lookupKey: "light",
  },
  {
    name: "スタンダード",
    lookupKey: "standard",
  },
  {
    name: "プレミアム",
    lookupKey: "premium",
  },
];
