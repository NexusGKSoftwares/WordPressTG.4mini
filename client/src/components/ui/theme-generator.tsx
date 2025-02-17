"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import { supabase } from "../lib/supabase"
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


  // Rest of the component remains the same...
  return <div>{/* ... existing JSX ... */}</div>
}

