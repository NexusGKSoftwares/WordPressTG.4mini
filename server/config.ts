import { createClient } from "@supabase/supabase-js"
import { Clerk } from "@clerk/backend"

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  throw new Error("Missing Supabase environment variables")
}

if (!process.env.CLERK_SECRET_KEY) {
  throw new Error("Missing Clerk Secret Key")
}

export const supabaseAdmin = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

export const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY })

export const cloudinary = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}

export const runwayApiKey = process.env.RUNWAY_API_KEY

