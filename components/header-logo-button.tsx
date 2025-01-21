import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { AppConfig } from "@/app.config";
import { cn } from "@/lib/utils";

/**
 *
 * @returns the header logo button
 */
export default function HeaderLogoButton({
  className,
  size = 8,
  title,
  hrefUrl = "/",
}: {
  className?: string;
  size?: number;
  title?: string;
  hrefUrl?: string;
}) {
  const titleValue = title ?? AppConfig.title;
  return (
    <Button
      variant="ghost"
      className={cn("text-2xl justify-start px-1", className)}
      asChild
    >
      <Link href={hrefUrl} className="flex items-center font-bold gap-2">
        <Image
          src={logo}
          alt=""
          className={`size-${size} dark:brightness-150 drop-shadow-lg`}
          priority
        />
        {titleValue}
      </Link>
    </Button>
  );
}
