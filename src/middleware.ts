import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated } from '@/services/auth';

const NOT_SECURE = ['/auth']
 
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const found = NOT_SECURE.find((path) => pathname.startsWith(path))
  const isAuth = await isAuthenticated()
  if (found && isAuth) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  if (!found && !isAuth) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}