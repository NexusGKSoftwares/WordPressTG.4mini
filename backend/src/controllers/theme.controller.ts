import type { Request, Response } from "express"
import { supabase } from "../lib/supabase"
import { generateThemeImage } from "../services/runway.service"
import { uploadToCloudinary } from "../services/cloudinary.service"

export class ThemeController {
  async generateTheme(req: Request, res: Response) {
    try {
      const { prompt, themeType, colorScheme, layout, typography, features } = req.body
      const userId = req.auth.userId

      // Generate theme image using Runway ML
      const imageUrl = await generateThemeImage(prompt)

      // Upload to Cloudinary
      const previewUrl = await uploadToCloudinary(imageUrl)

      // Create theme in Supabase
      const { data: theme, error } = await supabase
        .from("themes")
        .insert({
          user_id: userId,
          name: `${themeType} Theme`,
          description: prompt,
          preview_url: previewUrl,
          code: "/* Theme code will be generated here */",
          theme_type: themeType,
          color_scheme: colorScheme,
          layout,
          typography,
          features,
        })
        .select()
        .single()

      if (error) throw error

      res.json(theme)
    } catch (error) {
      console.error("Error generating theme:", error)
      res.status(500).json({ error: "Failed to generate theme" })
    }
  }

  async saveTheme(req: Request, res: Response) {
    try {
      const { name, description, previewUrl, code, themeType, colorScheme, layout, typography, features } = req.body
      const userId = req.auth.userId

      const { data: theme, error } = await supabase
        .from("themes")
        .insert({
          user_id: userId,
          name,
          description,
          preview_url: previewUrl,
          code,
          theme_type: themeType,
          color_scheme: colorScheme,
          layout,
          typography,
          features,
        })
        .select()
        .single()

      if (error) throw error

      res.json(theme)
    } catch (error) {
      console.error("Error saving theme:", error)
      res.status(500).json({ error: "Failed to save theme" })
    }
  }

  async getSavedThemes(req: Request, res: Response) {
    try {
      const userId = req.auth.userId

      const { data: themes, error } = await supabase
        .from("themes")
        .select(`
          *,
          theme_assets (*)
        `)
        .eq("user_id", userId)
        .eq("is_published", true)
        .order("created_at", { ascending: false })

      if (error) throw error

      res.json(themes)
    } catch (error) {
      console.error("Error fetching themes:", error)
      res.status(500).json({ error: "Failed to fetch themes" })
    }
  }

  async getThemeHistory(req: Request, res: Response) {
    try {
      const userId = req.auth.userId

      const { data: themes, error } = await supabase
        .from("themes")
        .select(`
          *,
          theme_assets (*)
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(10)

      if (error) throw error

      res.json(themes)
    } catch (error) {
      console.error("Error fetching theme history:", error)
      res.status(500).json({ error: "Failed to fetch theme history" })
    }
  }

  async uploadToWordPress(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { siteUrl, username, password } = req.body
      const userId = req.auth.userId

      // Verify theme ownership
      const { data: theme, error } = await supabase.from("themes").select().eq("id", id).eq("user_id", userId).single()

      if (error || !theme) {
        return res.status(404).json({ error: "Theme not found" })
      }

      // Implement WordPress upload logic here
      // This would include creating a ZIP file with theme files
      // and uploading it to the WordPress site via REST API

      res.json({ success: true })
    } catch (error) {
      console.error("Error uploading to WordPress:", error)
      res.status(500).json({ error: "Failed to upload to WordPress" })
    }
  }

  async addThemeAsset(req: Request, res: Response) {
    try {
      const { themeId } = req.params
      const { assetUrl, assetType } = req.body
      const userId = req.auth.userId

      // Verify theme ownership
      const { data: theme, error: themeError } = await supabase
        .from("themes")
        .select()
        .eq("id", themeId)
        .eq("user_id", userId)
        .single()

      if (themeError || !theme) {
        return res.status(404).json({ error: "Theme not found" })
      }

      // Add asset
      const { data: asset, error } = await supabase
        .from("theme_assets")
        .insert({
          theme_id: themeId,
          asset_url: assetUrl,
          asset_type: assetType,
        })
        .select()
        .single()

      if (error) throw error

      res.json(asset)
    } catch (error) {
      console.error("Error adding theme asset:", error)
      res.status(500).json({ error: "Failed to add theme asset" })
    }
  }
}

