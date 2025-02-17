import axios from "axios"
import FormData from "form-data"
import { createThemeZip } from "../utils/theme-packager"
import type { Theme } from "../types/theme"

interface WordPressCredentials {
  siteUrl: string
  username: string
  password: string
}

export class WordPressService {
  private getApiUrl(siteUrl: string) {
    return `${siteUrl.replace(/\/$/, "")}/wp-json`
  }

  private getAuthHeader(username: string, password: string) {
    return `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`
  }

  async validateCredentials(credentials: WordPressCredentials) {
    try {
      const response = await axios.get(`${this.getApiUrl(credentials.siteUrl)}/wp/v2/themes`, {
        headers: {
          Authorization: this.getAuthHeader(credentials.username, credentials.password),
        },
      })
      return response.status === 200
    } catch (error) {
      console.error("Failed to validate WordPress credentials:", error)
      return false
    }
  }

  async publishTheme(theme: Theme, credentials: WordPressCredentials) {
    try {
      // Validate credentials first
      const isValid = await this.validateCredentials(credentials)
      if (!isValid) {
        throw new Error("Invalid WordPress credentials")
      }

      // Create theme ZIP file
      const themeZipBuffer = await createThemeZip(theme)

      // Create FormData with the ZIP file
      const formData = new FormData()
      formData.append("themezip", themeZipBuffer, {
        filename: `${theme.name.toLowerCase().replace(/\s+/g, "-")}.zip`,
        contentType: "application/zip",
      })

      // Upload theme to WordPress
      const response = await axios.post(`${this.getApiUrl(credentials.siteUrl)}/wp/v2/themes`, formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: this.getAuthHeader(credentials.username, credentials.password),
        },
        maxContentLength: Number.POSITIVE_INFINITY,
        maxBodyLength: Number.POSITIVE_INFINITY,
      })

      return {
        success: true,
        theme: response.data,
      }
    } catch (error) {
      console.error("Failed to publish theme:", error)
      throw new Error("Failed to publish theme to WordPress site")
    }
  }

  async activateTheme(themeName: string, credentials: WordPressCredentials) {
    try {
      await axios.post(
        `${this.getApiUrl(credentials.siteUrl)}/wp/v2/themes`,
        {
          stylesheet: themeName,
        },
        {
          headers: {
            Authorization: this.getAuthHeader(credentials.username, credentials.password),
          },
        },
      )

      return { success: true }
    } catch (error) {
      console.error("Failed to activate theme:", error)
      throw new Error("Failed to activate theme")
    }
  }
}

