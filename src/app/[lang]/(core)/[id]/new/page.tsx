import { PageParams } from '@/utils/types';
import { getDictionary } from '@/utils/get_dictionaries';
import ProjectForm from './form'
import { createProject } from '@/services/project';
import { redirect } from 'next/navigation';
import { TProject } from '@/types/project';

export const ROUTE_NEW_PROJECT = 'project/new'

export default async function Page({ params: { lang }}: PageParams) {
  const t = await getDictionary(lang)
  async function create(project: TProject) {
    'use server'
    const response = await createProject(project)
    if (response instanceof Response) {
      return redirect(`/${lang}`)
    }
    return response;
  }
  return <ProjectForm t={t} action={create}/>
}