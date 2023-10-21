import 'server-only'

export type Keys = 'es' | 'en'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: Keys) => dictionaries[locale]()

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;