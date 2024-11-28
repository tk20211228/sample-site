import { Tables } from "@/types/database";

export type ProjectWithEnterpriseRelation = Tables<"projects"> & {
  enterprise_name: string | null; //projectとenterpriseのリレーションをした場合、enterprise_nameがnullの場合がある
};
