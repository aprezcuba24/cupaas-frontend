import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated } from '@/services/auth';

const NOT_SECURE = ['/auth']
 
export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const found = NOT_SECURE.find((path) => pathname.includes(path))
  const isAuth = await isAuthenticated()
  if (found && isAuth) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if (!found && !isAuth) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}