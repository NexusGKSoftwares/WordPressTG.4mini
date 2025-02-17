import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { SignedIn, SignedOut } from "@clerk/clerk-react"
import LoginPage from "./pages/login"
import ThemeGenerator from "./pages/theme-generator"
import { Toaster } from "../client/src/components/ui/toaster"

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <ThemeGenerator />
              </SignedIn>
              <SignedOut>
                <LoginPage />
              </SignedOut>
            </>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  )
}

export default App

