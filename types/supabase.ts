export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      evaluation_items: {
        Row: {
          category: string
          check_points: string[] | null
          created_at: string
          evaluation_section_id: string
          id: string
          item_name: string
          organization_id: string
          score: number | null
          updated_at: string
        }
        Insert: {
          category: string
          check_points?: string[] | null
          created_at?: string
          evaluation_section_id: string
          id?: string
          item_name: string
          organization_id: string
          score?: number | null
          updated_at?: string
        }
        Update: {
          category?: string
          check_points?: string[] | null
          created_at?: string
          evaluation_section_id?: string
          id?: string
          item_name?: string
          organization_id?: string
          score?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "evaluation_items_evaluation_section_id_fkey"
            columns: ["evaluation_section_id"]
            isOneToOne: false
            referencedRelation: "evaluation_sections"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluation_periods: {
        Row: {
          created_at: string
          id: string
          is_current: boolean | null
          name: string
          organization_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_current?: boolean | null
          name: string
          organization_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_current?: boolean | null
          name?: string
          organization_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      evaluation_sections: {
        Row: {
          cleanliness_good_points: string[] | null
          cleanliness_improvement_points: string[] | null
          cleanliness_max: number
          cleanliness_score: number
          created_at: string
          evaluation_id: string
          hospitality_good_points: string[] | null
          hospitality_improvement_points: string[] | null
          hospitality_max: number
          hospitality_score: number
          id: string
          organization_id: string
          section_type: string
          skill_good_points: string[] | null
          skill_improvement_points: string[] | null
          skill_max: number
          skill_score: number
          updated_at: string
        }
        Insert: {
          cleanliness_good_points?: string[] | null
          cleanliness_improvement_points?: string[] | null
          cleanliness_max: number
          cleanliness_score: number
          created_at?: string
          evaluation_id: string
          hospitality_good_points?: string[] | null
          hospitality_improvement_points?: string[] | null
          hospitality_max: number
          hospitality_score: number
          id?: string
          organization_id: string
          section_type: string
          skill_good_points?: string[] | null
          skill_improvement_points?: string[] | null
          skill_max: number
          skill_score: number
          updated_at?: string
        }
        Update: {
          cleanliness_good_points?: string[] | null
          cleanliness_improvement_points?: string[] | null
          cleanliness_max?: number
          cleanliness_score?: number
          created_at?: string
          evaluation_id?: string
          hospitality_good_points?: string[] | null
          hospitality_improvement_points?: string[] | null
          hospitality_max?: number
          hospitality_score?: number
          id?: string
          organization_id?: string
          section_type?: string
          skill_good_points?: string[] | null
          skill_improvement_points?: string[] | null
          skill_max?: number
          skill_score?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "evaluation_sections_evaluation_id_fkey"
            columns: ["evaluation_id"]
            isOneToOne: false
            referencedRelation: "evaluations"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluations: {
        Row: {
          action_plan: string | null
          created_at: string
          evaluation_date: string
          evaluation_period_id: string
          evaluator_id: string
          future_vision: string | null
          id: string
          organization_id: string
          staff_id: string
          status: string
          total_comment: string | null
          updated_at: string
        }
        Insert: {
          action_plan?: string | null
          created_at?: string
          evaluation_date: string
          evaluation_period_id: string
          evaluator_id: string
          future_vision?: string | null
          id?: string
          organization_id: string
          staff_id: string
          status: string
          total_comment?: string | null
          updated_at?: string
        }
        Update: {
          action_plan?: string | null
          created_at?: string
          evaluation_date?: string
          evaluation_period_id?: string
          evaluator_id?: string
          future_vision?: string | null
          id?: string
          organization_id?: string
          staff_id?: string
          status?: string
          total_comment?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "evaluations_evaluation_period_id_fkey"
            columns: ["evaluation_period_id"]
            isOneToOne: false
            referencedRelation: "evaluation_periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluations_evaluator_id_fkey"
            columns: ["evaluator_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "evaluations_staff_id_fkey"
            columns: ["staff_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          id: string
          is_demo: boolean | null
          is_setup_complete: boolean | null
          name: string
          organization_id: string | null
          role: string
          store_name: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          id: string
          is_demo?: boolean | null
          is_setup_complete?: boolean | null
          name: string
          organization_id?: string | null
          role: string
          store_name: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          id?: string
          is_demo?: boolean | null
          is_setup_complete?: boolean | null
          name?: string
          organization_id?: string | null
          role?: string
          store_name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_organization_id: { Args: never; Returns: string }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

