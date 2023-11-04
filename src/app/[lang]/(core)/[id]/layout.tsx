import Menu, { Option } from "./options"
import { PropsWithChildren } from 'react';
import { ROUTE_NEW_PROJECT } from "./new/page";
import { getCurrentDictionary } from '@/utils/get_dictionaries';
import { getProject } from '@/services/project';
import Title from '@/components/Title';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

const Options = (enabled=true): Option[] => ([
  {
    enabled,
    label: 'env_variables',
    value: 'env-variables',
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

type LayoutProps = {
  params: {
    id: string,
    lang: string,
  }
} & PropsWithChildren

export default async function Layout({ children, params: { id, lang } }: LayoutProps) {
  const isNewPage = ROUTE_NEW_PROJECT.startsWith(`${id}/`)
  const options = isNewPage ? [NewOption, ...Options(false)] : [DetailOption, ...Options()]
  const project = !isNewPage && await getProject(id)
  const t = await getCurrentDictionary()
  return (
    <div className="flex h-full">
      <div className="w-60 p-2 pt-6 bg-gray-100 h-full rounded mr-5">
        <Menu options={options} t={t}/>
      </div>
      <div className="w-full h-full">
        <div className="flex">
          <Link href={`/${lang}`}>
            <ArrowBackIcon className="mr-4" />
          </Link>
          <Title>
            {project ? project.name : t.project_form.title_new}
          </Title>
        </div>
        {children}
      </div>
    </div>
  )
}