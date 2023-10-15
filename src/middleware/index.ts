import type { NextRequest, NextFetchEvent } from 'next/server'
import chain from '@/middleware/chain'
import language from '@/middleware/language'
import secure from '@/middleware/secure'
 
export function middleware(request: NextRequest, event: NextFetchEvent) {
  return chain(secure, language)(request, event)
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}