'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Dictionary } from '@/utils/get_dictionaries';

const Options = (enabled=true): Option[] => ([
  {
    enabled,
    label: 'env_variables',
    value: 'env-variables',
  },
  {
    enabled,
    label: 'deploys',
    value: 'deploys',
  }
])

const NewOption: Option = {
  enabled: true,
  label: 'create',
  value: 'new',
}

const DetailOption: Option = {
  enabled: true,
  label: 'detail',
  value: 'detail'
}

type TLabelText = keyof Dictionary['project_menu']

export type Option = {
  label: TLabelText
  value: string
  enabled?: boolean
}

const OptionLiStyle = (active = false, enabled = true) => `
  h-8
  ${enabled ? 'bg-blue-500' : 'bg-blue-200'}
  text-white
  flex
  justify-center
  items-center
  cursor-pointer
  rounded
  mb-1
  text-sm
  ${active && 'border-r-4 border-r-blue-900'}
`

type MenuProps = {
  t: Dictionary,
  id: string,
  lang: string,
}

export default function Menu({ t, id, lang }: MenuProps) {
  const pathname = usePathname()
  const isNewPage = pathname.endsWith('/new')
  const options = isNewPage ? [NewOption, ...Options(false)] : [DetailOption, ...Options()]
  return (
    <ul className="flex flex-col">
      {options.map(({ label, value, enabled }) => {
        const link = `/${lang}/${id}/${value}`
        return (
          <li key={value}>
            <Link className={OptionLiStyle(pathname.includes(value), enabled)} href={enabled ? link : '#'}>
              {t.project_menu[label]}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
