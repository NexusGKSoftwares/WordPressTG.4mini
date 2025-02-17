
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return res
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
}

import { clerkClient as defaultClerkClient } from './client.ts'

const clerkMiddleware = (options) => {
  return async (context, next) => {
    const clerkClient = options.clerkClient || defaultClerkClient

    const requestState = await clerkClient.authenticateRequest(context.req, {
      authorizedParties: ['https://example.com'],
    })

    if (requestState.headers) {
      // This adds observability headers to the res
      requestState.headers.forEach((value, key) => context.res.headers.append(key, value))

      const locationHeader = requestState.headers.get('location')

      if (locationHeader) {
        return context.redirect(locationHeader, 307)
      } else if (requestState.status === 'handshake') {
        throw new Error('Clerk: unexpected handshake without redirect')
      }
    }

    context.set('clerkAuth', requestState.toAuth())
    context.set('clerk', clerkClient)

    await next()
  }
}