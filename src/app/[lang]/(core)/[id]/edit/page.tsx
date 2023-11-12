import ProjectForm, { TFormProject } from '../form';
import { getCurrentDictionary } from '@/utils/get_dictionaries';
import { TProject } from '@/types/project';
import { getProject, updateProject } from '@/services/project';
import { redirect } from 'next/navigation';

type PagePrams = {
  params: {
    id: string,
    lang: string,
  }
}

export default async function Page({ params: { id, lang } }: PagePrams) {
  const t = await getCurrentDictionary()
  const project: TProject = await getProject(id);
  async function create(project: TFormProject) {
    'use server'
    return (await updateProject(id, project as TProject) as Response).json()
  }
  return <ProjectForm
    t={t}
    action={create}
    value={project}
    lang={lang}
  />
}