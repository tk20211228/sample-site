import { AppConfig } from "@/app.config";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="sticky top-full border-t ">
      <div className="flex py-4 items-center justify-center px-4 gap-2">
        {/* いかをdivタグでわけないとスマホ画面がうまく調整できなかった */}
        <div>
          <Button variant="ghost">
            <p className="text-muted-foreground">&copy; {AppConfig.company}</p>
          </Button>
          <Button variant="ghost">利用規約</Button>
          <Button variant="ghost">プライバシーポリシー</Button>
          <Button variant="ghost">特定商法表示</Button>
          <Button variant="ghost">言語</Button>
        </div>
        <div>
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
