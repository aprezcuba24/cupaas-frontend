import Menu from "./options"
import { PropsWithChildren } from 'react';
import { ROUTE_NEW_PROJECT } from "./new/page";
import { getDictionary, Keys } from '@/utils/get_dictionaries';
import { getProject, removeProject } from '@/services/project';
import Header from './header';
import { redirect } from 'next/navigation';

type LayoutProps = {
  params: {
    id: string,
    lang: Keys,
  }
} & PropsWithChildren

export default async function Layout({ children, params: { id, lang } }: LayoutProps) {
  const isNewPage = ROUTE_NEW_PROJECT.startsWith(`${id}/`)
  const project = !isNewPage && await getProject(id)
  const t = await getDictionary(lang)
  async function doRemoveProject(id: string) {
    'use server'
    await removeProject(id)
    redirect(`/${lang}`)
  }

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
          removeProject={doRemoveProject}
        />
        {children}
      </div>
    </div>
  )
}