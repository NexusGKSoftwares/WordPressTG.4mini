import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!)

export async function POST(req: Request) {
  try {
    const { prompt, themeType, colorScheme, layout, typography, features } = await req.json()

    // Generate theme description
    const { text: themeDescription } = await generateText({
      model: openai("gpt-4"),
      system: "You are a WordPress theme expert. Generate detailed theme specifications based on user requirements.",
      prompt: `Create a WordPress theme with these specifications:
        Type: ${themeType}
        Color Scheme: ${colorScheme}
        Layout: ${layout}
        Typography: ${typography}
        Features: ${features.join(", ")}
        User Description: ${prompt}
        
        Provide the response in JSON format with:
        - theme_name
        - description
        - styles (including color palette, typography settings)
        - layout_structure
        - components
        - required_plugins`,
    })

    // Parse the generated theme description
    const themeSpec = JSON.parse(themeDescription)

    // Generate theme code
    const { text: themeCode } = await generateText({
      model: openai("gpt-4"),
      system: "You are a WordPress theme developer. Generate theme code based on specifications.",
      prompt: `Generate the core WordPress theme files based on these specifications: ${themeDescription}
      Include: style.css, functions.php, index.php, and header.php`,
    })

    // Save to database
    const { data: theme, error } = await supabase
      .from("themes")
      .insert({
        name: themeSpec.theme_name,
        description: themeSpec.description,
        specification: themeSpec,
        code: themeCode,
        user_id: req.headers.get("user-id"),
      })
      .select()
      .single()

    if (error) throw error

    return Response.json({ success: true, theme })
  } catch (error) {
    console.error(error)
    return Response.json({ success: false, error: "Failed to generate theme" }, { status: 500 })
  }
}

