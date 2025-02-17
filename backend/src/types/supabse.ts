export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      themes: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          description: string
          preview_url: string
          code: string
          theme_type: string
          color_scheme: string
          layout: string
          typography: string
          features: string[]
          is_published: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          description: string
          preview_url: string
          code: string
          theme_type: string
          color_scheme: string
          layout: string
          typography: string
          features: string[]
          is_published?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          description?: string
          preview_url?: string
          code?: string
          theme_type?: string
          color_scheme?: string
          layout?: string
          typography?: string
          features?: string[]
          is_published?: boolean
        }
      }
      theme_assets: {
        Row: {
          id: string
          created_at: string
          theme_id: string
          asset_url: string
          asset_type: string
        }
        Insert: {
          id?: string
          created_at?: string
          theme_id: string
          asset_url: string
          asset_type: string
        }
        Update: {
          id?: string
          created_at?: string
          theme_id?: string
          asset_url?: string
          asset_type?: string
        }
      }
    }
  }
}

