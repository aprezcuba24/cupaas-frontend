import Menu, { Option } from "./options"

const Options: Option[] = [
  {
    label: 'Create',
    value: 'new',
  },
  {
    label: 'Environment variables',
    value: 'env-variables',
  }
]

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <div className="w-60">
        <Menu options={Options} optionActive="create" />
      </div>
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  )
}