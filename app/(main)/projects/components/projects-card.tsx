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
  Loader2,
  Plus,
  ShieldCheckIcon,
  SmartphoneIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";

import { ProjectWithEnterpriseRelation } from "../../types/project";
import { deleteProject } from "../actions/projects";
import ProductOptionsButton from "./product-options-button";

import { SiAndroid } from "@icons-pack/react-simple-icons";

interface ProjectCardProps {
  projectsData: ProjectWithEnterpriseRelation[];
}

export default function ProjectsCard({ projectsData }: ProjectCardProps) {
  const [projects, setProjects] =
    useState<ProjectWithEnterpriseRelation[]>(projectsData);
  // console.log(projects);
  const [isPending, startTransition] = useTransition();
  const [pendingProjectId, setPendingProjectId] = useState<string | null>(null);

  const handleGetSignUpUrl = (projectId: string) => {
    setPendingProjectId(projectId);
    startTransition(async () => {
      await getSignUpUrl(projectId);
      setPendingProjectId(null);
    });
  };

  const handleProjectDelete = async (projectId: string) => {
    setPendingProjectId(projectId);
    startTransition(async () => {
      await deleteProject(projectId);
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
      setPendingProjectId(null);
    });
  };
  const removeEnterprisesKeyword = (name: string | null) => {
    if (!name) return null;
    return name.replace("enterprises/", "");
  };

  return (
    <div className="mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
      {projects.map((project) => {
        const enterpriseId = removeEnterprisesKeyword(project.enterprise_name);
        console.log(enterpriseId);
        return (
          <div className="group/card" key={project.id}>
            <Card className=" relative h-60 duration-300 dark:bg-zinc-900 dark:border-zinc-700 transition ease-in-out group-hover/card:bg-accent">
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
                className="absolute right-3 bottom-3 text-muted-foreground transition-all duration-300 hover:right-5 hover:text-foreground z-30 "
                onClick={() => handleProjectDelete(project.id)}
              >
                <Trash2Icon />
              </Button>
              <ChevronRight className="absolute right-6 top-7 text-muted-foreground transition-all duration-200 group-hover/card:right-5 group-hover/card:text-foreground" />
              {project.enterprise_name && (
                <div className="absolute left-5 bottom-3 flex flex-row space-x-2">
                  <ProductOptionsButton
                    className="z-30"
                    icon={<SmartphoneIcon />}
                    link={`/projects/${enterpriseId}/devices`}
                  />
                  <ProductOptionsButton
                    className="z-30"
                    icon={<ShieldCheckIcon />}
                    link={`/projects/${enterpriseId}/policies`}
                  />
                  <ProductOptionsButton
                    className="z-30"
                    icon={<SiAndroid />}
                    link={`/projects/${enterpriseId}/apps/public`}
                  />
                </div>
              )}
              {!project.enterprise_name && (
                <button
                  onClick={() => handleGetSignUpUrl(project.id)}
                  className="group/button absolute inset-0 z-20 w-full h-full transition-colors duration-300"
                >
                  {/* <span className="absolute inset-0 z-20 group"></span> */}
                  <span className="sr-only">
                    サインアップURLを発行し、リダイレクトする
                  </span>
                </button>
              )}
              {isPending && pendingProjectId === project.id && (
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <Loader2 className="animate-spin text-muted-foreground size-12" />
                </div>
              )}
            </Card>
          </div>
        );
      })}
      <Card className="flex h-60 items-center justify-center hover:bg-accent hover:border-accent-foreground duration-300 relative">
        <Link href="/projects/new">
          <span className="absolute inset-0" />
          <span className="sr-only">プロジェクト画面に遷移する</span>
          <Plus className="text-muted-foreground size-10 " />
        </Link>
      </Card>
    </div>
  );
}
