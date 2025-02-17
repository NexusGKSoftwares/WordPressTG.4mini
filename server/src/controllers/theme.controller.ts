import type { Request, Response } from "express"
import { supabase } from "../../supabase"
import { WordPressService } from "../../services/wordpress.service"

class ThemeController {
  async publishToWordPress(req: Request, res: Response) {
    try {
      const { id } = req.params
      const { siteUrl, username, password } = req.body
      const userId = req.auth.userId

      // Verify theme ownership
      const { data: theme, error } = await supabase
        .from("themes")
        .select("*")
        .eq("id", id)
        .eq("user_id", userId)
        .single()

      if (error || !theme) {
        return res.status(404).json({ error: "Theme not found" })
      }

      const wordPressService = new WordPressService()

      // Validate WordPress credentials
      const isValid = await wordPressService.validateCredentials({
        siteUrl,
        username,
        password,
      })

      if (!isValid) {
        return res.status(400).json({ error: "Invalid WordPress credentials" })
      }

      // Publish theme
      const result = await wordPressService.publishTheme(theme, {
        siteUrl,
        username,
        password,
      })

      // Update theme status in database
      await supabase
        .from("themes")
        .update({
          is_published: true,
          published_url: siteUrl,
        })
        .eq("id", id)

      res.json(result)
    } catch (error) {
      console.error("Error publishing theme:", error)
      res.status(500).json({ error: "Failed to publish theme" })
    }
  }
}

export default new ThemeController()

