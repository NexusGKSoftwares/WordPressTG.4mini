if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
    throw new Error("Missing Clerk Publishable Key")
  }
  
  export const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
  
  