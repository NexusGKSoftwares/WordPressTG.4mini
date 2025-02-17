

import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import SignInPage from "./pages/SignIn";
import ThemeGeneratorPage from "./pages/ThemeGenerator";
import SuggestionsPage from "./pages/Suggestions";

// Load Clerk Publishable Key from environment variables
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Add other environment variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  console.error("❌ Missing Clerk Publishable Key! Check your .env file.");
}

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <BrowserRouter>
        <Routes>
          Sign-In Route
          <Route
            path="/sign-in"
            element={
              <SignedOut>
                <SignInPage />
              </SignedOut>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <SignedIn>
                <ThemeGeneratorPage />
              </SignedIn>
            }
          />
          <Route
            path="/suggestions"
            element={
              <SignedIn>
                <SuggestionsPage />
              </SignedIn>
            }
          />

          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      {/* Toast notifications */}
      <Toaster />
    </ClerkProvider>
  );
}

export default App;
