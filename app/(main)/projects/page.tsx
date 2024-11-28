import ProjectCard from "./components/projects-card";
import { getProjects } from "./data/projects";

export default async function Page() {
  // Server Componentでデータを取得
  const projectsData = await getProjects();
  return (
    <div className="p-2">
      <ProjectCard projectsData={projectsData} />
    </div>
  );
}
