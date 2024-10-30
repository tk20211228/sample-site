import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { AppConfig } from "@/app.config";

/**
 *
 * @returns the header logo button
 */
export default function HeaderLogoButton() {
  return (
    <>
      <Button variant="ghost" className="text-2xl" asChild>
        <Link href="/" className="flex items-center font-bold gap-2">
          <Image
            src={logo}
            alt=""
            className="size-8 dark:brightness-150 drop-shadow-lg"
            priority
          />
          {AppConfig.title}
        </Link>
      </Button>
    </>
  );
}
