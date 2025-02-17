import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { ThemeGenerator } from "@/components/theme-generator"

export default async function Page() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const { data: savedThemes } = await supabase
    .from("themes")
    .select("*")
    .eq("user_id", session?.user.id)
    .order("created_at", { ascending: false })

  return <ThemeGenerator savedThemes={savedThemes} userId={session?.user.id} />
}

