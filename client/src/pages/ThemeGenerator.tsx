"use client"

import { useState } from "react"
import { UserButton } from "@clerk/clerk-react"
import { ThemeGenerator } from "@/Components/theme-generator"
import { Button } from "@/components/ui/button"
import { Sparkles, Lightbulb } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ThemeGeneratorPage() {
  const navigate = useNavigate()
  const [savedThemes, setSavedThemes] = useState([])

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <a className="mr-6 flex items-center space-x-2" href="/">
              <Sparkles className="h-6 w-6" />
              <span className="font-bold">WordPressTG</span>
            </a>
          </div>
          <div className="flex flex-1 items-center space-x-2">
            <Button variant="ghost" onClick={() => navigate("/suggestions")}>
              <Lightbulb className="mr-2 h-4 w-4" />
              Get AI Suggestions
            </Button>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <UserButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 pt-8">
        <ThemeGenerator savedThemes={savedThemes} />
      </main>
    </div>
  )
}

