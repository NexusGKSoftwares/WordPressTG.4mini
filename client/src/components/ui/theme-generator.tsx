"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/clerk-react"
import { supabase } from "../lib/supabase"

export interface LocalTheme {
  id: string
  created_at: string
  name: string
}

export function ThemeGenerator() {
  const { user } = useUser()
  const [] = useState("")
  const [ ] = useState(false)
  const [ ] = useState<LocalTheme | null>(null)
  const [savedThemes, setSavedThemes] = useState<LocalTheme[]>([])
  const [ ] = useState<File[]>([])

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
  return (
    <div>
      {/* ... existing JSX ... */}
      <div>
        {savedThemes.length > 0 ? (
          savedThemes.map((theme) => (
            <div key={theme.id}>
              <h3>{theme.name}</h3>
              {/* Render other theme details */}
            </div>
          ))
        ) : (
          <p>No themes saved.</p>
        )}
      </div>
    </div>
  )
}

