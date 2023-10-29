import { setLanguage, Keys } from './../get_dictionaries'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales: Keys[] = ['en', 'es']
const defaultLocale: Keys = 'es'

export default async function language(request: NextRequest) {
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
  if (pathnameHasLocale) return
  const headers = { 'accept-language': 'en-US,en;q=0.5' }
  const languages = new Negotiator({ headers }).languages()
  const locale: Keys = match(languages, locales, defaultLocale) as Keys
  setLanguage(locale)
  request.nextUrl.pathname = `/${locale}${pathname}`
  return Response.redirect(request.nextUrl)
}