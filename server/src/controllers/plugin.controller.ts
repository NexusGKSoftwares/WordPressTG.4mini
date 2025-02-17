import type { Request, Response } from "express"
import { WordPressPluginService } from "../services/wordpress-plugin.service"
import { supabase } from "../lib/supabase"

export class PluginController {
  private pluginService = new WordPressPluginService()

  async recommendPlugins(req: Request, res: Response) {
    try {
      const { themeId } = req.params

      // Get theme details
      const { data: theme, error } = await supabase.from("themes").select("*").eq("id", themeId).single()

      if (error || !theme) {
        return res.status(404).json({ error: "Theme not found" })
      }

      const recommendations = await this.pluginService.recommendPlugins(
        `${theme.description}\nTheme type: ${theme.theme_type}\nFeatures: ${theme.features.join(", ")}`,
      )

      res.json(recommendations)
    } catch (error) {
      console.error("Error getting plugin recommendations:", error)
      res.status(500).json({ error: "Failed to get plugin recommendations" })
    }
  }

  async installPlugins(req: Request, res: Response) {
    try {
      const { themeId } = req.params
      const { plugins, credentials } = req.body

      // Get theme details
      const { data: theme, error } = await supabase.from("themes").select("*").eq("id", themeId).single()

      if (error || !theme) {
        return res.status(404).json({ error: "Theme not found" })
      }

      const results = []
      for (const plugin of plugins) {
        try {
          // Install and activate plugin
          await this.pluginService.installPlugin(credentials, plugin.slug)

          // Generate and apply configuration
          const config = await this.pluginService.generatePluginConfig(
            plugin.slug,
            `${theme.description}\nTheme type: ${theme.theme_type}\nFeatures: ${theme.features.join(", ")}`,
          )
          await this.pluginService.configurePlugin(credentials, plugin.slug, config)

          results.push({
            slug: plugin.slug,
            status: "success",
            config,
          })
        } catch (error) {
          results.push({
            slug: plugin.slug,
            status: "error",
            error: error.message,
          })
        }
      }

      res.json(results)
    } catch (error) {
      console.error("Error installing plugins:", error)
      res.status(500).json({ error: "Failed to install plugins" })
    }
  }
}

export default new PluginController()

