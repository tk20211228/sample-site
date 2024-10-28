import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <h1>ダッシュボード</h1>
      <Button variant="outline" asChild>
        <Link href="/profile">マイページへ</Link>
      </Button>
    </div>
  );
}
