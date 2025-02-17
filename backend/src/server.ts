import express from "express"
import cors from "cors"
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node"
import { ThemeController } from "./controllers/theme.controller"
import { uploadMiddleware } from "./middleware/upload"

const app = express()

app.use(cors())
app.use(express.json())

// Clerk authentication middleware
const requireAuth = ClerkExpressRequireAuth({
  jwtKey: process.env.CLERK_JWT_KEY,
})

const themeController = new ThemeController()

// Theme routes
app.post("/themes/generate", requireAuth, themeController.generateTheme)
app.post("/themes", requireAuth, uploadMiddleware, themeController.saveTheme)
app.get("/themes", requireAuth, themeController.getSavedThemes)
app.get("/themes/history", requireAuth, themeController.getThemeHistory)
app.post("/themes/:id/wordpress", requireAuth, themeController.uploadToWordPress)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

