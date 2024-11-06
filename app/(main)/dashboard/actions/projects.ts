"use server";

import { createClient } from "@/lib/supabase/server";

/**
 * プロジェクト一覧を取得
 * @returns プロジェクト一覧
 *
 * RLSポリシーにより：
 * プロジェクトオーナー（owner_id = auth.uid()）
 * または、プロジェクトメンバー（is_project_user(id)がtrueを返す）
 * のプロジェクトのみが取得されます。
 */
export const getProjects = async () => {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError) throw new Error("User not authenticated");
  if (!user) throw new Error("User not authenticated");
  console.log("user_id", user.id);
  // プロジェクト一覧を取得
  const { data, error } = await supabase
    .from("project_members")
    .select(
      `
      projects (
        id,
        project_name,
        enterprise_id,
        enterprises (
          enterprise_name
        )
      )
    `
    )
    .eq("user_id", user.id);
  if (error) {
    console.error("Error getting projects:", error);
    throw new Error("Error getting projects");
  }
  const projects = data.map((item) => item.projects);
  return projects;
};

export const deleteProject = async (projectId: string) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);
  if (error) {
    console.error("Error deleting project:", error);
    throw new Error("Error deleting project");
  }
  // revalidatePath("/dashboard"); //
};
