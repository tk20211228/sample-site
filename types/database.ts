export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      application_reports: {
        Row: {
          created_at: string
          data: Json
          device_table_id: string
          id: string
        }
        Insert: {
          created_at?: string
          data: Json
          device_table_id: string
          id?: string
        }
        Update: {
          created_at?: string
          data?: Json
          device_table_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_reports_device_table_id_fkey"
            columns: ["device_table_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
        ]
      }
      apps: {
        Row: {
          app_details: Json
          app_type: string
          created_at: string
          enterprise_table_id: string
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          app_details: Json
          app_type: string
          created_at?: string
          enterprise_table_id: string
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          app_details?: Json
          app_type?: string
          created_at?: string
          enterprise_table_id?: string
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "apps_enterprise_table_id_fkey"
            columns: ["enterprise_table_id"]
            isOneToOne: false
            referencedRelation: "enterprises"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          body: string
          created_at: string
          id: number
          updated_at: string
          userId: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: number
          updated_at?: string
          userId?: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: number
          updated_at?: string
          userId?: string
        }
        Relationships: []
      }
      devices: {
        Row: {
          created_at: string
          device_config_data: Json
          device_name: string
          display_name: string
          enterprise_table_id: string
          id: string
          policy_name: string | null
          policy_table_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          device_config_data: Json
          device_name: string
          display_name: string
          enterprise_table_id: string
          id?: string
          policy_name?: string | null
          policy_table_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          device_config_data?: Json
          device_name?: string
          display_name?: string
          enterprise_table_id?: string
          id?: string
          policy_name?: string | null
          policy_table_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "devices_enterprise_table_id_fkey"
            columns: ["enterprise_table_id"]
            isOneToOne: false
            referencedRelation: "enterprises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "devices_policy_table_id_fkey"
            columns: ["policy_table_id"]
            isOneToOne: false
            referencedRelation: "policies"
            referencedColumns: ["id"]
          },
        ]
      }
      enterprise_settings_history: {
        Row: {
          created_at: string
          created_by_user_id: string
          enterprise_id: string
          id: number
          settings: Json
        }
        Insert: {
          created_at?: string
          created_by_user_id?: string
          enterprise_id: string
          id?: number
          settings: Json
        }
        Update: {
          created_at?: string
          created_by_user_id?: string
          enterprise_id?: string
          id?: number
          settings?: Json
        }
        Relationships: [
          {
            foreignKeyName: "enterprise_settings_history_enterprise_id_fkey"
            columns: ["enterprise_id"]
            isOneToOne: false
            referencedRelation: "enterprises"
            referencedColumns: ["id"]
          },
        ]
      }
      enterprises: {
        Row: {
          created_at: string
          data: Json
          enterprise_name: string
          id: string
          owner_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          data: Json
          enterprise_name: string
          id?: string
          owner_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          data?: Json
          enterprise_name?: string
          id?: string
          owner_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      memory_events: {
        Row: {
          created_at: string
          data: Json
          device_table_id: string
          id: string
        }
        Insert: {
          created_at?: string
          data: Json
          device_table_id: string
          id?: string
        }
        Update: {
          created_at?: string
          data?: Json
          device_table_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "memory_events_device_table_id_fkey"
            columns: ["device_table_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
        ]
      }
      policies: {
        Row: {
          created_at: string
          display_name: string | null
          enterprise_table_id: string
          id: string
          policy_config_data: Json
          policy_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          enterprise_table_id?: string
          id?: string
          policy_config_data: Json
          policy_name: string
          updated_at: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          enterprise_table_id?: string
          id?: string
          policy_config_data?: Json
          policy_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "policies_enterprise_table_id_fkey"
            columns: ["enterprise_table_id"]
            isOneToOne: false
            referencedRelation: "enterprises"
            referencedColumns: ["id"]
          },
        ]
      }
      power_manegement_events: {
        Row: {
          created_at: string
          data: Json
          device_table_id: string
          id: string
        }
        Insert: {
          created_at?: string
          data: Json
          device_table_id: string
          id?: string
        }
        Update: {
          created_at?: string
          data?: Json
          device_table_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "power_manegement_events_device_table_id_fkey"
            columns: ["device_table_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
        ]
      }
      project_members: {
        Row: {
          created_at: string
          id: number
          project_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          project_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          project_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          enterprise_table_id: string | null
          id: string
          organization_name: string
          owner_id: string
          project_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          enterprise_table_id?: string | null
          id?: string
          organization_name: string
          owner_id?: string
          project_name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          enterprise_table_id?: string | null
          id?: string
          organization_name?: string
          owner_id?: string
          project_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_enterprise_id_fkey"
            columns: ["enterprise_table_id"]
            isOneToOne: false
            referencedRelation: "enterprises"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string
          id: string
          username: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          username: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_enterprise_access: {
        Args: {
          enterprise_table_id: string
        }
        Returns: boolean
      }
      is_project_user: {
        Args: {
          project_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

