import { Github, GitlabIcon, Key, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 px-4">
        <Card className="border-none shadow-none">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Log in to WordPressTG</CardTitle>
            <CardDescription>Choose your preferred login method</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full bg-[#24292F] text-white hover:bg-[#24292F]/90">
                <Github className="mr-2 h-4 w-4" />
                Continue with GitHub
              </Button>
              <Button variant="outline" className="w-full bg-[#6B4FBB] text-white hover:bg-[#6B4FBB]/90">
                <GitlabIcon className="mr-2 h-4 w-4" />
                Continue with GitLab
              </Button>
              <Button variant="outline" className="w-full bg-[#0052CC] text-white hover:bg-[#0052CC]/90">
                <svg
                  className="mr-2 h-4 w-4"
                  fill="currentColor"
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.778 1.211a.768.768 0 00-.768.787.768.768 0 00.768.787h1.727v2.36H.778a.768.768 0 00-.768.788c0 .436.344.787.768.787h1.727v2.36H.778a.768.768 0 00-.768.787c0 .436.344.788.768.788h1.727v2.36H.778a.768.768 0 00-.768.787c0 .436.344.788.768.788h1.727v2.36H.778a.768.768 0 00-.768.787c0 .436.344.788.768.788h1.727v2.36H.778a.768.768 0 00-.768.787c0 .437.344.788.768.788h1.727v2.36H.778a.768.768 0 00-.768.788c0 .436.344.787.768.787h1.727v.788c0 .436.344.787.768.787h1.727v-1.575h2.303c.424 0 .768-.351.768-.787a.768.768 0 00-.768-.788H3.273v-2.36h2.303c.424 0 .768-.35.768-.787a.768.768 0 00-.768-.788H3.273v-2.36h2.303c.424 0 .768-.35.768-.787a.768.768 0 00-.768-.788H3.273v-2.36h2.303c.424 0 .768-.35.768-.787a.768.768 0 00-.768-.788H3.273v-2.36h2.303c.424 0 .768-.35.768-.787a.768.768 0 00-.768-.788H3.273v-2.36h2.303c.424 0 .768-.35.768-.787a.768.768 0 00-.768-.788H3.273v-2.36h2.303c.424 0 .768-.35.768-.787a.768.768 0 00-.768-.788H3.273V1.211H.778zm8.335 0a.768.768 0 00-.768.787.768.768 0 00.768.787h13.82a.768.768 0 00.768-.787.768.768 0 00-.768-.787H9.113zm0 3.934a.768.768 0 00-.768.788c0 .436.344.787.768.787h13.82a.768.768 0 00.768-.787.768.768 0 00-.768-.788H9.113zm0 3.935a.768.768 0 00-.768.787c0 .436.344.788.768.788h13.82a.768.768 0 00.768-.788.768.768 0 00-.768-.787H9.113zm0 3.934a.768.768 0 00-.768.787c0 .437.344.788.768.788h13.82a.768.768 0 00.768-.788.768.768 0 00-.768-.787H9.113zm0 3.934a.768.768 0 00-.768.788c0 .436.344.787.768.787h13.82a.768.768 0 00.768-.787.768.768 0 00-.768-.788H9.113zm0 3.935a.768.768 0 00-.768.787c0 .436.344.788.768.788h13.82a.768.768 0 00.768-.788.768.768 0 00-.768-.787H9.113z" />
                </svg>
                Continue with Bitbucket
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                <Key className="mr-2 h-4 w-4" />
                Login with Passkey
              </Button>
              <Button variant="outline" className="w-full">
                <Mail className="mr-2 h-4 w-4" />
                Continue with Email
              </Button>
            </div>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <a href="/signup" className="text-primary hover:underline">
                Sign Up
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

