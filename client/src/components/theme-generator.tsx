"use client"

import { Button } from "@/components/ui/button"

import { TabsContent } from "@/components/ui/tabs"

import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import * as React from "react"
import { Send } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { ThemePreview } from "@/components/theme-preview"
// ... (previous imports)

interface ThemeGeneratorProps {
  savedThemes: any[]
  userId: string
}

export function ThemeGenerator({ savedThemes, userId }: ThemeGeneratorProps) {
  const [prompt, setPrompt] = React.useState("")
  const [generating, setGenerating] = React.useState(false)
  const [currentTheme, setCurrentTheme] = React.useState<any>(null)
  const [selectedFeatures, setSelectedFeatures] = React.useState<string[]>([])
  const { toast } = useToast()

  const handleGenerate = async () => {
    try {
      setGenerating(true)

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": userId,
        },
        body: JSON.stringify({
          prompt,
          themeType: document.querySelector("[name=theme-type]")?.value,
          colorScheme: document.querySelector("[name=color-scheme]")?.value,
          layout: document.querySelector("[name=layout-style]")?.value,
          typography: document.querySelector("[name=typography]")?.value,
          features: selectedFeatures,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setCurrentTheme(data.theme)
        toast({
          title: "Theme generated successfully!",
          description: "Your custom WordPress theme is ready.",
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate theme. Please try again.",
        variant: "destructive",
      })
    } finally {
      setGenerating(false)
    }
  }

  const handleExportToWordPress = async () => {
    try {
      const response = await fetch("/api/wordpress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          siteUrl: prompt("Enter your WordPress site URL:"),
          username: prompt("Enter your WordPress username:"),
          password: prompt("Enter your WordPress password:"),
          theme: currentTheme,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Theme installed successfully!",
          description: "Your theme has been uploaded to WordPress.",
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to install theme. Please check your credentials and try again.",
        variant: "destructive",
      })
    }
  }

  // ... (previous JSX)
  return (
    <div className="container mx-auto p-4 max-w-6xl">
      {/* ... (previous content) */}

      {/* Add Saved Themes Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Saved Themes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedThemes?.map((theme) => (
            <Card
              key={theme.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setCurrentTheme(theme)}
            >
              <CardContent className="p-4">
                <h3 className="font-semibold">{theme.name}</h3>
                <p className="text-sm text-muted-foreground">{theme.description}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Created: {new Date(theme.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Update Preview Section */}
      <TabsContent value="preview" className="min-h-[400px] mt-4">
        {currentTheme ? (
          <ThemePreview theme={currentTheme} />
        ) : (
          <div className="rounded-lg border bg-muted/50 aspect-video flex items-center justify-center">
            Theme preview will appear here
          </div>
        )}
      </TabsContent>

      {/* Update Code Section */}
      <TabsContent value="code" className="min-h-[400px] mt-4">
        {currentTheme ? (
          <pre className="p-4 rounded-lg bg-muted overflow-auto">
            <code>{currentTheme.code}</code>
          </pre>
        ) : (
          <div className="rounded-lg border bg-muted/50 aspect-video flex items-center justify-center">
            Generated theme code will appear here
          </div>
        )}
      </TabsContent>

      {/* Update Export Options */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              <h3 className="font-semibold">Export Options</h3>
            </div>
            <div className="space-y-2">
              <Button
                className="w-full"
                variant="outline"
                disabled={!currentTheme}
                onClick={() => {
                  const blob = new Blob([currentTheme.code], { type: "text/plain" })
                  const url = URL.createObjectURL(blob)
                  const a = document.createElement("a")
                  a.href = url
                  a.download = `${currentTheme.name}.zip`
                  a.click()
                }}
              >
                Download Theme Files
              </Button>
              <Button className="w-full" variant="outline" disabled={!currentTheme} onClick={handleExportToWordPress}>
                Export to WordPress
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

