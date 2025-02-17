import React from "react";
import { SignIn } from "@clerk/clerk-react"
import { Card } from "@/components/ui/card"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <Card className="p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">WordPressTG</h1>
          <p className="text-muted-foreground">Sign in to continue</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none",
            },
          }}
        />
      </Card>
    </div>
  )
}

