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
  // プロジェクト一覧を取得
  const { data, error } = await supabase.from("projects")
    .select(`id, project_name, enterprise_id,enterprises (
        enterprise_name
      )`);
  if (error) {
    console.error("Error getting projects:", error);
    throw new Error("Error getting projects");
  }
  return data;
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
