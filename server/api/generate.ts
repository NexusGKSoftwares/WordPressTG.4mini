import express from "express"
import { supabaseAdmin, clerk } from "../config"

const router = express.Router()

router.post("/generate", async (req, res) => {
  try {
    // Verify authentication
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: "No authorization header" })
    }

    const token = authHeader.split(" ")[1]
    const session = await clerk.sessions.verifySession(token)
    if (!session) {
      return res.status(401).json({ error: "Invalid session" })
    }

    const { prompt, userId, imageUrls, themeType, colorScheme, layout, typography, features } = req.body

    // Generate theme using AI
    // TODO: Implement AI generation logic using RunwayML and/or other AI services

    // Save to Supabase
    const { data: theme, error } = await supabaseAdmin
      .from("themes")
      .insert({
        name: "Generated Theme", // Replace with actual name
        description: prompt,
        specification: {
          themeType,
          colorScheme,
          layout,
          typography,
          features,
          imageUrls,
        },
        code: "/* Generated theme code */",
        user_id: userId,
      })
      .select()
      .single()

    if (error) throw error

    res.json({ success: true, theme })
  } catch (error) {
    console.error("Generation error:", error)
    res.status(500).json({ success: false, error: "Failed to generate theme" })
  }
})

export default router

