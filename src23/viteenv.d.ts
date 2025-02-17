/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_CLERK_PUBLISHABLE_KEY: string
    readonly VITE_SUPABASE_URL: string
    readonly VITE_SUPABASE_ANON_KEY: string
    readonly VITE_CLOUDINARY_CLOUD_NAME: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  
  