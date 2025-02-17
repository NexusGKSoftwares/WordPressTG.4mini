"use client"

import { useState } from "react"
import { UserButton } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Sparkles, ArrowLeft, Loader2 } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function SuggestionsPage() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<any[]>([])

  const handleGetSuggestions = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) throw new Error("Failed to get suggestions")

      const data = await response.json()
      setSuggestions(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get suggestions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

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
            <Button variant="ghost" onClick={() => navigate("/")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Generator
            </Button>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <UserButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 pt-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get AI Suggestions</CardTitle>
              <CardDescription>
                Describe what kind of WordPress theme you're looking to create, and our AI will provide suggestions and
                recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="e.g. I want to create a modern e-commerce theme with a dark mode and support for multiple languages..."
                className="min-h-[100px]"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
              <Button className="w-full" onClick={handleGetSuggestions} disabled={loading || !prompt}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Suggestions...
                  </>
                ) : (
                  "Get Suggestions"
                )}
              </Button>
            </CardContent>
          </Card>

          {suggestions.map((suggestion, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{suggestion.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm dark:prose-invert">
                  <div dangerouslySetInnerHTML={{ __html: suggestion.content }} />
                </div>
                {suggestion.features && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Recommended Features:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {suggestion.features.map((feature: string, i: number) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <Button
                  className="mt-4"
                  variant="outline"
                  onClick={() => {
                    navigate("/", { state: { suggestion } })
                  }}
                >
                  Use This Suggestion
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

