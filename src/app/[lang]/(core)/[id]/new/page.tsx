import { PageParams } from '@/utils/types';
import { getDictionary } from '@/utils/get_dictionaries';
import ProjectForm, { TFormProject } from '../form'
import { createProject } from '@/services/project';
import { TProject } from '@/types/project';

const InitialData: TFormProject = {
  name: "",
  git_url: "",
  branches: [
    {
      ref: 'main',
    },
  ]
}

export default async function Page({ params: { lang }}: PageParams) {
  const t = await getDictionary(lang)
  async function create(project: TFormProject) {
    'use server'
    return (await createProject(project as TProject) as Response).json()
  }
  return <ProjectForm
    t={t}
    action={create}
    value={InitialData}
    lang={lang}
  />
}