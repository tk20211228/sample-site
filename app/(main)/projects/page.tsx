import { getProjects } from "../dashboard/data/projects";
import ProjectCard from "./components/projects-card";

export default async function Page() {
  // Server Componentでデータを取得
  const projectsData = await getProjects();
  return (
    <div className="p-2">
      <ProjectCard projectsData={projectsData} />
    </div>
  );
}
