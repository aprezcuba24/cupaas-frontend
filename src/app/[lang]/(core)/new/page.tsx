import { PageParams } from '@/utils/types';
import { getDictionary } from '@/utils/get_dictionaries';
import ProjectForm from './form'
import Title from '@/components/Title';
import { createProject } from '@/services/project';
import { redirect } from 'next/navigation';

export default async function Page({ params: { lang }}: PageParams) {
  const t = await getDictionary(lang)
  async function create(formData: FormData) {
    'use server'
    const response = await createProject(formData)
    if (response instanceof Response) {
      return redirect(`/${lang}`)
    }
    return response;
  }
  return (
    <>
      <Title>
        {t.project_form.title_new}
      </Title>
      <ProjectForm t={t} action={create}/>
    </>
  )
}