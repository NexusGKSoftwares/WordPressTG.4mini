export async function POST(req: Request) {
  try {
    const { siteUrl, username, password, theme } = await req.json()

    // Create FormData with theme files
    const formData = new FormData()
    formData.append("theme_zip", new Blob([theme.code], { type: "application/zip" }))

    // WordPress REST API endpoint for theme installation
    const endpoint = `${siteUrl}/wp-json/wp/v2/themes`

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to install theme")
    }

    const result = await response.json()
    return Response.json({ success: true, result })
  } catch (error) {
    console.error(error)
    return Response.json({ success: false, error: "Failed to install theme" }, { status: 500 })
  }
}

