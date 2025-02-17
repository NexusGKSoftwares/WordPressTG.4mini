export const generateThemeImage = async (prompt: string): Promise<string> => {
  const response = await fetch("https://api.runwayml.com/v1/inference", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_RUNWAY_API_KEY}`,
    },
    body: JSON.stringify({
      prompt,
      model: "stable-diffusion-v1-5",
      negative_prompt: "low quality, bad quality",
      num_outputs: 1,
      guidance_scale: 7.5,
      num_inference_steps: 50,
    }),
  })

  const data = await response.json()
  return data.output[0]
}

