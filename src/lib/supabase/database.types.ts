export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      collectible_progress: {
        Row: {
          collectible_id: string
          id: string
          status: Database["public"]["Enums"]["collectible_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          collectible_id: string
          id?: string
          status?: Database["public"]["Enums"]["collectible_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          collectible_id?: string
          id?: string
          status?: Database["public"]["Enums"]["collectible_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collectible_progress_collectible_id_fkey"
            columns: ["collectible_id"]
            isOneToOne: false
            referencedRelation: "collectibles"
            referencedColumns: ["id"]
          },
        ]
      }
      collectible_sources: {
        Row: {
          collectible_id: string
          source_id: string
        }
        Insert: {
          collectible_id: string
          source_id: string
        }
        Update: {
          collectible_id?: string
          source_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "collectible_sources_collectible_id_fkey"
            columns: ["collectible_id"]
            isOneToOne: false
            referencedRelation: "collectibles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collectible_sources_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      collectible_types: {
        Row: {
          created_at: string
          game_id: string
          icon_url: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          game_id: string
          icon_url?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string
          game_id?: string
          icon_url?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "collectible_types_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      collectibles: {
        Row: {
          attributes: Json
          collectible_type_id: string
          coord_x: number | null
          coord_y: number | null
          created_at: string
          game_id: string
          id: string
          name: string
          region_id: string
          sort_order: number
        }
        Insert: {
          attributes?: Json
          collectible_type_id: string
          coord_x?: number | null
          coord_y?: number | null
          created_at?: string
          game_id: string
          id?: string
          name: string
          region_id: string
          sort_order?: number
        }
        Update: {
          attributes?: Json
          collectible_type_id?: string
          coord_x?: number | null
          coord_y?: number | null
          created_at?: string
          game_id?: string
          id?: string
          name?: string
          region_id?: string
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "collectibles_collectible_type_id_fkey"
            columns: ["collectible_type_id"]
            isOneToOne: false
            referencedRelation: "collectible_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collectibles_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collectibles_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      games: {
        Row: {
          cover_url: string | null
          created_at: string
          id: string
          platform: string
          release_date: string | null
          slug: string
          title: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          id?: string
          platform: string
          release_date?: string | null
          slug: string
          title: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          id?: string
          platform?: string
          release_date?: string | null
          slug?: string
          title?: string
        }
        Relationships: []
      }
      guide_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          guide_step_id: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          guide_step_id: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          guide_step_id?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "guide_progress_guide_step_id_fkey"
            columns: ["guide_step_id"]
            isOneToOne: false
            referencedRelation: "guide_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      guide_steps: {
        Row: {
          created_at: string
          description: string | null
          guide_id: string
          id: string
          region_id: string | null
          sort_order: number
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          guide_id: string
          id?: string
          region_id?: string | null
          sort_order?: number
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          guide_id?: string
          id?: string
          region_id?: string | null
          sort_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "guide_steps_guide_id_fkey"
            columns: ["guide_id"]
            isOneToOne: false
            referencedRelation: "guides"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "guide_steps_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      guides: {
        Row: {
          created_at: string
          description: string | null
          game_id: string
          id: string
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          game_id: string
          id?: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          game_id?: string
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "guides_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      region_sources: {
        Row: {
          region_id: string
          source_id: string
        }
        Insert: {
          region_id: string
          source_id: string
        }
        Update: {
          region_id?: string
          source_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "region_sources_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "region_sources_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
        ]
      }
      regions: {
        Row: {
          created_at: string
          game_id: string
          id: string
          map_image_url: string | null
          name: string
          parent_region_id: string | null
          sort_order: number
        }
        Insert: {
          created_at?: string
          game_id: string
          id?: string
          map_image_url?: string | null
          name: string
          parent_region_id?: string | null
          sort_order?: number
        }
        Update: {
          created_at?: string
          game_id?: string
          id?: string
          map_image_url?: string | null
          name?: string
          parent_region_id?: string | null
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "regions_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "regions_parent_region_id_fkey"
            columns: ["parent_region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      sources: {
        Row: {
          created_at: string
          id: string
          notes: string | null
          retrieved_at: string
          title: string | null
          url: string
        }
        Insert: {
          created_at?: string
          id?: string
          notes?: string | null
          retrieved_at?: string
          title?: string | null
          url: string
        }
        Update: {
          created_at?: string
          id?: string
          notes?: string | null
          retrieved_at?: string
          title?: string | null
          url?: string
        }
        Relationships: []
      }
      trophies: {
        Row: {
          created_at: string
          description: string
          game_id: string
          grade: Database["public"]["Enums"]["trophy_grade"]
          icon_url: string | null
          id: string
          is_secret: boolean
          name: string
          rarity_percent: number | null
          sort_order: number
        }
        Insert: {
          created_at?: string
          description: string
          game_id: string
          grade: Database["public"]["Enums"]["trophy_grade"]
          icon_url?: string | null
          id?: string
          is_secret?: boolean
          name: string
          rarity_percent?: number | null
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string
          game_id?: string
          grade?: Database["public"]["Enums"]["trophy_grade"]
          icon_url?: string | null
          id?: string
          is_secret?: boolean
          name?: string
          rarity_percent?: number | null
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "trophies_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      trophy_progress: {
        Row: {
          earned: boolean
          earned_at: string | null
          id: string
          trophy_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          earned?: boolean
          earned_at?: string | null
          id?: string
          trophy_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          earned?: boolean
          earned_at?: string | null
          id?: string
          trophy_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trophy_progress_trophy_id_fkey"
            columns: ["trophy_id"]
            isOneToOne: false
            referencedRelation: "trophies"
            referencedColumns: ["id"]
          },
        ]
      }
      trophy_sources: {
        Row: {
          source_id: string
          trophy_id: string
        }
        Insert: {
          source_id: string
          trophy_id: string
        }
        Update: {
          source_id?: string
          trophy_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "trophy_sources_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "sources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "trophy_sources_trophy_id_fkey"
            columns: ["trophy_id"]
            isOneToOne: false
            referencedRelation: "trophies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      game_progress: {
        Row: {
          bronze_earned: number | null
          bronze_total: number | null
          game_id: string | null
          gold_earned: number | null
          gold_total: number | null
          percent_complete: number | null
          platinum_earned: number | null
          platinum_total: number | null
          silver_earned: number | null
          silver_total: number | null
          trophies_earned: number | null
          trophies_total: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "trophies_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
        ]
      }
      region_collectible_progress: {
        Row: {
          collectible_type_id: string | null
          completed: number | null
          missing: number | null
          region_id: string | null
          total: number | null
          unconfirmed: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collectibles_collectible_type_id_fkey"
            columns: ["collectible_type_id"]
            isOneToOne: false
            referencedRelation: "collectible_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "collectibles_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      collectible_status: "completed" | "missing" | "unconfirmed"
      trophy_grade: "bronze" | "silver" | "gold" | "platinum"
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
  public: {
    Enums: {
      collectible_status: ["completed", "missing", "unconfirmed"],
      trophy_grade: ["bronze", "silver", "gold", "platinum"],
    },
  },
} as const
