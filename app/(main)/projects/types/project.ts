import { Tables } from "@/types/database";

export type Project = Tables<"projects"> & {
  enterprise_name: string | null;
};
