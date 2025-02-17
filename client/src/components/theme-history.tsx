import { Card, CardContent } from "@/components/ui/card"
import { History } from "lucide-react"

interface ThemeHistoryProps {
  onSelect: (theme: any) => void
}

export function ThemeHistory({ onSelect }: ThemeHistoryProps) {
  // Mock history data - replace with actual data from your backend
  const historyItems = [
    {
      id: 1,
      name: "Portfolio Theme",
      description: "A minimal portfolio theme",
      date: "2024-02-16",
      preview: "/placeholder.svg",
    },
    // Add more history items
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <History className="w-5 h-5" />
        <h2 className="text-2xl font-bold">Generation History</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {historyItems.map((item) => (
          <Card
            key={item.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onSelect(item)}
          >
            <CardContent className="p-4">
              <div className="aspect-video mb-4 rounded-lg overflow-hidden">
                <img src={item.preview || "/placeholder.svg"} alt={item.name} className="object-cover w-full h-full" />
              </div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
              <p className="text-xs text-muted-foreground mt-2">
                Generated: {new Date(item.date).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

