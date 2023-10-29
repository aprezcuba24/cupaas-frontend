export type Keys = 'es' | 'en'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
}
 
export const getDictionary = async (locale: Keys) => dictionaries[locale]()

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

let singletonLang: Keys = 'es'

export const setLanguage = (lang: Keys) => singletonLang = lang;

export const getCurrentDictionary = () => getDictionary(singletonLang);
export const getCurrentLang = () => singletonLang;