"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import { supabase } from "../lib/supabase"
import { cloudinaryConfig } from "../lib/cloudinary"
import { toast } from "../components/ui/use-toast"
import { generateTheme } from "../utils/api"
import type { Theme } from "../types/theme"

export function ThemeGenerator() {
  const { user } = useUser()
  const [prompt, setPrompt] = useState("")
  const [generating, setGenerating] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null)
  const [savedThemes, setSavedThemes] = useState<Theme[]>([])
  const [images, setImages] = useState<File[]>([])

  useEffect(() => {
    if (user) {
      loadSavedThemes()
    }
  }, [user])

  const loadSavedThemes = async () => {
    if (!user) return

    const { data, error } = await supabase
      .from("themes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error loading themes:", error)
      return
    }

    setSavedThemes(data || [])
  }

  const handleGenerate = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to generate themes",
        variant: "destructive",
      })
      return
    }

    try {
      setGenerating(true)

      // Upload images to Cloudinary if any
      let imageUrls: string[] = []
      if (images.length > 0) {
        const uploadPromises = images.map(async (image) => {
          const formData = new FormData()
          formData.append("file", image)
          formData.append("upload_preset", cloudinaryConfig.uploadPreset)

          const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
            method: "POST",
            body: formData,
          })

          const data = await response.json()
          return data.secure_url
        })

        imageUrls = await Promise.all(uploadPromises)
      }

      // Generate theme
      const { success, theme } = await generateTheme({
        prompt,
        userId: user.id,
        imageUrls,
        themeType: "wordpress", // TODO: Get from form
        colorScheme: "light", // TODO: Get from form
        layout: "responsive", // TODO: Get from form
        typography: "modern", // TODO: Get from form
        features: ["responsive", "seo-optimized"], // TODO: Get from form
      })

      if (success) {
        setCurrentTheme(theme)
        await loadSavedThemes()
        toast({
          title: "Theme generated successfully!",
          description: "Your custom WordPress theme is ready.",
        })
      } else {
        console.error("Theme generation failed:", theme.error)
        toast({
          title: "Error",
          description: "Failed to generate theme. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Generation error:", error)
      toast({
        title: "Error",
        description: "Failed to generate theme. Please try again.",
        variant: "destructive",
      })
    } finally {
      setGenerating(false)
    }
  }

  // Rest of the component remains the same...
  return <div>{/* ... existing JSX ... */}</div>
}

