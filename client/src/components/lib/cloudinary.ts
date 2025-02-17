export const cloudinaryConfig = {
  cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  uploadPreset: "wordpress-themes",
}

if (!cloudinaryConfig.cloudName) {
  throw new Error("Missing Cloudinary configuration")
}



