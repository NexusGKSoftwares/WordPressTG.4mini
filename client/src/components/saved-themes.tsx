import { Card, CardContent } from "@/components/ui/card"
import { Save } from "lucide-react"

interface SavedThemesProps {
  onSelect: (theme: any) => void
}

export function SavedThemes({ onSelect }: SavedThemesProps) {
  // Mock saved themes data - replace with actual data from your backend
  const savedThemes = [
    {
      id: 1,
      name: "Business Theme",
      description: "A professional business theme",
      date: "2024-02-16",
      preview: "/placeholder.svg",
    },
    // Add more saved themes
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Save className="w-5 h-5" />
        <h2 className="text-2xl font-bold">Saved Themes</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {savedThemes.map((theme) => (
          <Card
            key={theme.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(theme)}
          >
            <CardContent className="p-4">
              <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                <img
                  src={theme.preview || "/placeholder.svg"}
                  alt={theme.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-semibold">{theme.name}</h3>
              <p className="text-sm text-muted-foreground">{theme.description}</p>
              <p className="text-xs text-muted-foreground mt-2">Saved: {new Date(theme.date).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

