import axios from "axios"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types/supabase"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

// Supabase client for real-time updates
export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

export interface ThemeGenerationParams {
  prompt: string
  themeType: string
  colorScheme: string
  layout: string
  typography: string
  features: string[]
}

export type Theme = Database["public"]["Tables"]["themes"]["Row"]
export type ThemeAsset = Database["public"]["Tables"]["theme_assets"]["Row"]

export const generateTheme = async (params: ThemeGenerationParams): Promise<Theme> => {
  const { data } = await api.post("/themes/generate", params)
  return data
}

export const saveTheme = async (theme: Omit<Theme, "id" | "created_at">): Promise<Theme> => {
  const { data } = await api.post("/themes", theme)
  return data
}

export const getSavedThemes = async (): Promise<Theme[]> => {
  const { data } = await api.get("/themes")
  return data
}

export const getThemeHistory = async (): Promise<Theme[]> => {
  const { data } = await api.get("/themes/history")
  return data
}

export const uploadToWordPress = async (
  themeId: string,
  credentials: {
    siteUrl: string
    username: string
    password: string
  },
): Promise<{ success: boolean }> => {
  const { data } = await api.post(`/themes/${themeId}/wordpress`, credentials)
  return data
}

// Real-time subscriptions
export const subscribeToThemeUpdates = (userId: string, onUpdate: (theme: Theme) => void) => {
  return supabase
    .from("themes")
    .on("INSERT", (payload) => {
      if (payload.new.user_id === userId) {
        onUpdate(payload.new)
      }
    })
    .subscribe()
}


