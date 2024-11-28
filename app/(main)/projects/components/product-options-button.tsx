import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ProjectWithEnterpriseRelation } from "../../types/project";

export default function ProductOptionsButton({
  className,
  project,
  link,
  icon,
}: {
  className?: string;
  project: ProjectWithEnterpriseRelation;
  link: string;
  icon: React.ReactNode;
}) {
  if (!project.enterprise_name) return null;
  //project.enterprise_nameから”enterprises”を除外する
  const removeEnterprisesKeyword = (name: string) => {
    return name.replace("enterprises/", "");
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("text-muted-foreground hover:text-foreground ", className)}
    >
      <Link
        href={`/projects/${removeEnterprisesKeyword(
          project.enterprise_name
        )}/${link}`}
      >
        {icon}
      </Link>
    </Button>
  );
}
