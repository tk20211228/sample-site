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
import {
  ChevronRight,
  LayoutDashboardIcon,
  Plus,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { deleteProject } from "../../dashboard/actions/projects";
import { Project } from "../types/project";

interface ProjectCardProps {
  projectsData: Project[];
}

export default function ProjectsCard({ projectsData }: ProjectCardProps) {
  const [projects, setProjects] = useState<Project[]>(projectsData);
  console.log(projects);

  const handleProjectDelete = async (projectId: string) => {
    await deleteProject(projectId);
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  //project.enterprise_nameから”enterprises”を除外する
  const removeEnterprisesKeyword = (name: string) => {
    return name.replace("enterprises/", "");
  };

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
              {project.enterprise_name ?? "未設定"}
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
            className="absolute right-3 bottom-6 text-muted-foreground transition-all duration-300 hover:right-5 hover:text-foreground z-30 "
            onClick={() => handleProjectDelete(project.id)}
          >
            <Trash2Icon />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-3 bottom-6 text-muted-foreground hover:text-foreground z-30 "
          >
            <Link
              href={`/dashboard?enterprises_name=${project.enterprise_name}`}
            >
              <LayoutDashboardIcon />
            </Link>
          </Button>
          <ChevronRight className="absolute right-6 top-7 text-muted-foreground transition-all duration-200 group-hover:right-5 group-hover:text-foreground" />
          {!project.enterprise_name ? (
            <button onClick={() => getSignUpUrl(project.id)}>
              <span className="absolute inset-0 z-20"></span>
            </button>
          ) : (
            // <Link
            //   href={`/dashboard?enterprises_name=${project.enterprise_name}`}
            //   className="absolute inset-0 z-20"
            // />
            <Link
              href={`/projects/${removeEnterprisesKeyword(
                project.enterprise_name
              )}/devices`}
              className="absolute inset-0 z-20"
            />
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
