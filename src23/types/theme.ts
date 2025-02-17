export interface Theme {
    id: string
    user_id: string
    name: string
    description: string
    specification: {
      themeType: string
      colorScheme: string
      layout: string
      typography: string
      features: string[]
      imageUrls?: string[]
    }
    code: string
    created_at: string
  }
  
  export interface ThemeGenerationRequest {
    prompt: string
    userId: string
    imageUrls?: string[]
    themeType: string
    colorScheme: string
    layout: string
    typography: string
    features: string[]
  }
  
  