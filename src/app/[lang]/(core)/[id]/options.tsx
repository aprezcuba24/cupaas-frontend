'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Dictionary } from '@/utils/get_dictionaries';

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

export default function Menu({ options, t }: { options: Option[], t: Dictionary }) {
  const pathname = usePathname()
  return (
    <ul className="flex flex-col">
      {options.map(({ label, value, enabled }) => (
        <li key={value}>
          <Link className={OptionLiStyle(pathname.includes(value), enabled)} href={enabled ? value : '#'}>
            {t.project_menu[label]}
          </Link>
        </li>
      ))}
    </ul>
  )
}
