import { Card, CardContent, CardHeader } from "@/components/ui/card";

import ProjectCard from "./project-card";

export default function InitialSettingForm() {
  return (
    <Card>
      <CardHeader>
        <h2>初期設定</h2>
      </CardHeader>
      <CardContent>
        <p>エンタープライズIDの作成</p>
        <div className="flex gap-2 pt-2">
          <ProjectCard />
        </div>
      </CardContent>
    </Card>
  );
}
