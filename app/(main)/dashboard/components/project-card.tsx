"use client";

import { getSignUpUrl } from "@/actions/emm/signup-url";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight, Plus, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteProject, getProjects } from "../actions/projects";
import { useRouter } from "next/navigation";

interface Project {
  id: string;
  project_name: string;
  enterprise_id: string | null;
  enterprises: {
    enterprise_name: string | null;
  } | null;
}

export default function ProjectCard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
    });
  }, []);

  console.log(projects);
  return (
    <div className="mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
      {projects.map((project) => (
        <Card
          className="group relative h-60 hover:bg-accent duration-300 dark:bg-zinc-900 dark:border-zinc-700 transition ease-in-out group" //
          key={project.id}
        >
          <CardHeader>
            <CardTitle className="text-lg flex">
              プロジェクト : {project.project_name}
            </CardTitle>
            <CardDescription>
              {project.enterprises?.enterprise_name ?? "未設定"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>端末数：</p>
            <p>管理者：</p>
            <p>メンバー：</p>
          </CardContent>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 bottom-6 text-muted-foreground size-10 transition-all duration-300 hover:right-5 hover:text-foreground z-30 "
            onClick={() =>
              deleteProject(project.id).then(() =>
                // 削除が成功したら、状態を更新して削除されたプロジェクトをリストから除外
                setProjects((prev) => prev.filter((p) => p.id !== project.id))
              )
            }
          >
            <Trash2Icon />
          </Button>
          <ChevronRight className="absolute right-6 top-7 text-muted-foreground transition-all duration-200 group-hover:right-5 group-hover:text-foreground" />
          {!project.enterprises ? (
            <button onClick={() => getSignUpUrl(project.id)}>
              <span className="absolute inset-0 z-20"></span>
            </button>
          ) : (
            <button
              onClick={() => {
                router.replace(
                  `/dashboard?enterprises_name=${project.enterprises?.enterprise_name}`
                );
              }}
            >
              <span className="absolute inset-0 z-20"></span>
            </button>
          )}
        </Card>
      ))}

      <Card className="flex h-60 items-center justify-center  hover:bg-accent duration-300 relative">
        <button>
          <Link href="/dashboard/new">
            <span className="absolute inset-0"></span>
          </Link>
          <Plus className="size-10 text-zinc-500" />
        </button>
      </Card>
    </div>
  );
}
