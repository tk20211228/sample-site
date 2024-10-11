import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;

export function CardDemo({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[500px]", className)} {...props}>
      <CardContent className="p-6">
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            maxime quisquam repellendus numquam perferendis repellat dolorum
            nemo architecto molestias quas vel sint deserunt tenetur, earum
            velit aut ratione reprehenderit laboriosam.
          </p>
        </div>
        <div className="pt-4 flex flex-row items-center gap-5">
          <div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col">
            <span>山田 太郎</span>
            <span className="text-muted-foreground">
              株式会社 サイバーガジェット
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
