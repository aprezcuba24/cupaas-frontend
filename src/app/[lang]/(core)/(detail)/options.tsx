'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export type Option = {
  label: string
  value: string
}

const OptionLiStyle = (active = false) => `
  h-8
  bg-blue-500
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

export default function Menu({ options, optionActive }: { options: Option[], optionActive: string }) {
  const pathname = usePathname()
  console.log(pathname);
  return (
    <ul className="flex flex-col p-2 pt-6 bg-gray-100 h-full rounded mr-5">
      {options.map(({ label, value }) => (
        <li key={value}>
          <Link className={OptionLiStyle(pathname.includes(value))} href={value}>{label}</Link>
        </li>
      ))}
    </ul>
  )
}
