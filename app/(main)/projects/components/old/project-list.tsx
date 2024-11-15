import { getProjects } from "../../../dashboard/data/projects";
import ProjectsCard from "../projects-card";

export default async function ProjectList() {
  // Server Componentでデータを取得
  const projectsData = await getProjects();

  return <ProjectsCard projectsData={projectsData} />;
}
