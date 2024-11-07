import { getProjects } from "../../data/projects";
import ProjectCard from "./project-card";

export default async function ProjectList() {
  // Server Componentでデータを取得
  const initialProjects = await getProjects();

  return <ProjectCard initialProjects={initialProjects} />;
}
