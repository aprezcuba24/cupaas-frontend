import type { NextRequest, NextFetchEvent } from 'next/server'
import chain from '@/utils/middleware/chain'
import language from '@/utils/middleware/language'
import secure from '@/utils/middleware/secure'
 
export function middleware(request: NextRequest, event: NextFetchEvent) {
  return chain(secure, language)(request, event)
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}