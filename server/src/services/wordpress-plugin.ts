import axios from "axios"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import type { WordPressCredentials } from "../types/wordpress"

export class WordPressPluginService {
  private getApiUrl(siteUrl: string) {
    return `${siteUrl.replace(/\/$/, "")}/wp-json`
  }

  private getAuthHeader(username: string, password: string) {
    return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`
  }

  async recommendPlugins(themeDescription: string) {
    try {
      const { text: recommendations } = await generateText({
        model: openai("gpt-4"),
        system: "You are a WordPress expert. Recommend plugins based on theme requirements.",
        prompt: `Based on this theme description, recommend essential WordPress plugins:
          ${themeDescription}
          
          Return the response as a JSON array with objects containing:
          - slug: WordPress plugin slug
          - reason: Why this plugin is recommended
          - configuration: Suggested configuration settings as key-value pairs`,
      })

      return JSON.parse(recommendations)
    } catch (error) {
      console.error("Failed to get plugin recommendations:", error)
      throw error
    }
  }

  async installPlugin(credentials: WordPressCredentials, pluginSlug: string) {
    try {
      // Install plugin
      await axios.post(
        `${this.getApiUrl(credentials.siteUrl)}/wp/v2/plugins`,
        { slug: pluginSlug },
        {
          headers: {
            Authorization: this.getAuthHeader(credentials.username, credentials.password),
          },
        },
      )

      // Activate plugin
      await axios.post(
        `${this.getApiUrl(credentials.siteUrl)}/wp/v2/plugins/${pluginSlug}/activate`,
        {},
        {
          headers: {
            Authorization: this.getAuthHeader(credentials.username, credentials.password),
          },
        },
      )

      return { success: true }
    } catch (error) {
      console.error(`Failed to install/activate plugin ${pluginSlug}:`, error)
      throw error
    }
  }

  async configurePlugin(credentials: WordPressCredentials, pluginSlug: string, settings: Record<string, any>) {
    try {
      // Get plugin configuration endpoint
      const response = await axios.get(`${this.getApiUrl(credentials.siteUrl)}/wp/v2/plugins/${pluginSlug}/settings`, {
        headers: {
          Authorization: this.getAuthHeader(credentials.username, credentials.password),
        },
      })

      // Update plugin settings
      await axios.post(`${this.getApiUrl(credentials.siteUrl)}/wp/v2/plugins/${pluginSlug}/settings`, settings, {
        headers: {
          Authorization: this.getAuthHeader(credentials.username, credentials.password),
        },
      })

      return { success: true }
    } catch (error) {
      console.error(`Failed to configure plugin ${pluginSlug}:`, error)
      throw error
    }
  }

  async generatePluginConfig(pluginSlug: string, themeDescription: string) {
    try {
      const { text: config } = await generateText({
        model: openai("gpt-4"),
        system: "You are a WordPress plugin configuration expert.",
        prompt: `Generate optimal configuration settings for the WordPress plugin '${pluginSlug}' 
          based on this theme description: ${themeDescription}
          
          Return the response as a JSON object with configuration settings as key-value pairs.`,
      })

      return JSON.parse(config)
    } catch (error) {
      console.error("Failed to generate plugin configuration:", error)
      throw error
    }
  }
}

