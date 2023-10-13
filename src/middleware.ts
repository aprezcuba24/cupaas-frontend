import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const NOT_SECURE = ['/auth']
 
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname === '/') {
    return
  }
  const found = NOT_SECURE.find((path) => pathname.startsWith(path))
  const token = request.cookies.get('token')
  if (found && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  if (!found && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).+)',
  ],
}