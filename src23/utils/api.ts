// src/utils/api.ts
interface ThemeGenerationRequest {
    // Define the structure of your ThemeGenerationRequest here
    name: string
    // Add other properties as needed
  }
  
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"
  
  export async function generateTheme(data: ThemeGenerationRequest) {
    const response = await fetch(`${API_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAuthToken()}`,
      },
      body: JSON.stringify(data),
    })
  
    if (!response.ok) {
      throw new Error("Failed to generate theme")
    }
  
    return response.json()
  }
  
  async function getAuthToken(): Promise<string> {
    // Get the token from Clerk
    const token = await window.Clerk?.session?.getToken()
    if (!token) {
      throw new Error("No authentication token available")
    }
    return token
  }
  
  