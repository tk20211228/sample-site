import { Button } from "@/components/ui/button";
import Image from "next/image";
import { marketingItems } from "./data/marketing-item";
import { CardDemo } from "./components/card-deme";

export default function Home() {
  return (
    <main className="flex flex-col">
      <section>
        <h1 className="text-center text-2xl md:text-3xl lg:text-4xl my-6 px-4">
          ビジネス向けモバイルデバイス管理ソリューション
        </h1>
      </section>
      <section className="w-full">
        {/* https://webspe.net/tools/wave-svg/  */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // viewBox="0 0 1280 100" から　viewBox="0 0 1280 99"に変更するしたら下部に細い線が消えた
          viewBox="0 0 1280 99"
          preserveAspectRatio="none"
          className="fill-[#57B0FF] dark:fill-zinc-900 canvas"
        >
          <path d="M -256 29 C -96 29 -96 68 64 68 C 224 68 224 35 384 35 C 544 35 544 99 704 99 C 864 99 864 25 1024 25 C 1184 25 1184 37 1344 37 L 1280 100 L 0 100 Z"></path>
        </svg>
      </section>
      <section className="bg-[#57B0FF] dark:bg-zinc-900 w-full pt-10">
        <div className="flex flex-col-reverse md:flex-row justify-evenly items-center">
          <div className="flex flex-col justify-evenly items-center gap-12">
            <div className="mt-5 gap-14 flex flex-row items-center">
              <Image
                src="/images/AER_Badge_2023.webp"
                alt="AER_Badge"
                // ↓ なにをどのように設定するのかよくわからない
                width={170}
                height={100}
                className="h-16"
              />
              <Image
                src="/images/AndroidEnterpriseSilverPartner.webp"
                alt="AndroidEnterpriseSilverPartner"
                width={120}
                height={100}
                className="h-16"
              />
            </div>
            {marketingItems.map((item, _) => (
              <div key={_} className="flex flex-col items-center gap-6 mx-3">
                <h2 className="text-2xl md:text-3xl lg:text-4xl ">
                  {item.title}
                </h2>
                <p className="text-center">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-5">
            <Image
              src="/images/phone.webp"
              alt="phone"
              width={400}
              height={400}
              className="w-[150px] md:w-auto md:h-[500px] relative left-[4px] md:left-[7px]"
            />
            <Button className="mb-10 md:mb-0 bg-red-500 dark:bg-red-300 shadow-lg ">
              今すぐお試しください。
            </Button>
          </div>
        </div>
        <div className="p-5 pt-20 flex items-center justify-evenly">
          <CardDemo />
        </div>
      </section>
    </main>
  );
}
