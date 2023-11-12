import Menu from "./options"
import { PropsWithChildren } from 'react';
import { ROUTE_NEW_PROJECT } from "./new/page";
import { getCurrentDictionary } from '@/utils/get_dictionaries';
import { getProject } from '@/services/project';
import Header from './header';

type LayoutProps = {
  params: {
    id: string,
    lang: string,
  }
} & PropsWithChildren

export default async function Layout({ children, params: { id, lang } }: LayoutProps) {
  const isNewPage = ROUTE_NEW_PROJECT.startsWith(`${id}/`)
  const project = !isNewPage && await getProject(id)
  const t = await getCurrentDictionary()
  return (
    <div className="flex h-full">
      <div className="w-60 p-2 pt-6 bg-gray-100 h-full rounded mr-5">
        <Menu t={t}/>
      </div>
      <div className="w-full h-full">
        <Header
          t={t}
          project={project}
          lang={lang}
          id={id}
        />
        {children}
      </div>
    </div>
  )
}