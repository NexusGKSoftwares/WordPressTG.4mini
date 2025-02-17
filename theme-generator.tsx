"use client"

import * as React from "react"
import { Paintbrush, Settings, Sparkles, Image, Layout, Code, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function ThemeGenerator() {
  const [prompt, setPrompt] = React.useState("")
  const [generating, setGenerating] = React.useState(false)

  const handleGenerate = async () => {
    setGenerating(true)
    // Simulate generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setGenerating(false)
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">WordPressTG</h1>
          <p className="text-lg text-muted-foreground">
            Generate custom WordPress themes using AI. Describe your vision, and we&apos;ll bring it to life.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Sparkles className="h-5 w-5 mt-1" />
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="prompt">Describe your ideal WordPress theme</Label>
                      <Textarea
                        id="prompt"
                        placeholder="e.g. A modern, minimalist theme for a photography portfolio with dark mode support..."
                        className="min-h-[120px]"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Theme Type</Label>
                      <Select defaultValue="portfolio">
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="portfolio">Portfolio</SelectItem>
                          <SelectItem value="blog">Blog</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="ecommerce">E-commerce</SelectItem>
                          <SelectItem value="magazine">Magazine</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Color Scheme</Label>
                      <Select defaultValue="auto">
                        <SelectTrigger>
                          <SelectValue placeholder="Select scheme" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto (System)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" onClick={handleGenerate} disabled={!prompt || generating}>
                    {generating ? (
                      <>Generating your theme...</>
                    ) : (
                      <>
                        <Paintbrush className="w-4 h-4 mr-2" />
                        Generate Theme
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <Tabs defaultValue="preview">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="preview">
                      <Layout className="w-4 h-4 mr-2" />
                      Preview
                    </TabsTrigger>
                    <TabsTrigger value="code">
                      <Code className="w-4 h-4 mr-2" />
                      Code
                    </TabsTrigger>
                    <TabsTrigger value="assets">
                      <Image className="w-4 h-4 mr-2" />
                      Assets
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="preview" className="min-h-[400px] mt-4">
                    <div className="rounded-lg border bg-muted/50 aspect-video flex items-center justify-center">
                      Theme preview will appear here
                    </div>
                  </TabsContent>
                  <TabsContent value="code" className="min-h-[400px] mt-4">
                    <div className="rounded-lg border bg-muted/50 aspect-video flex items-center justify-center">
                      Generated theme code will appear here
                    </div>
                  </TabsContent>
                  <TabsContent value="assets" className="min-h-[400px] mt-4">
                    <div className="rounded-lg border bg-muted/50 aspect-video flex items-center justify-center">
                      Theme assets will appear here
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    <h3 className="font-semibold">Advanced Settings</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Layout Style</Label>
                      <Select defaultValue="responsive">
                        <SelectTrigger>
                          <SelectValue placeholder="Select layout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="responsive">Responsive</SelectItem>
                          <SelectItem value="fixed">Fixed Width</SelectItem>
                          <SelectItem value="fluid">Fluid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Typography</Label>
                      <Select defaultValue="modern">
                        <SelectTrigger>
                          <SelectValue placeholder="Select style" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="modern">Modern</SelectItem>
                          <SelectItem value="classic">Classic</SelectItem>
                          <SelectItem value="minimal">Minimal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Features</Label>
                      <TooltipProvider>
                        <div className="flex flex-wrap gap-2">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="sm">
                                Responsive Design
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Optimized for all screen sizes</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="sm">
                                SEO Optimized
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Built with SEO best practices</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="sm">
                                Custom Widgets
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Includes customizable widgets</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    <h3 className="font-semibold">Export Options</h3>
                  </div>
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline">
                      Download Theme Files
                    </Button>
                    <Button className="w-full" variant="outline">
                      Export to WordPress
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

