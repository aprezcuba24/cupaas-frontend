import { getDictionary } from '@/utils/get_dictionaries'
import { PageParams } from '@/utils/types';
import Form from './form';
import { createAccount } from '@/services/auth';
import { redirect } from 'next/navigation';

export default async function Page({ params: { lang } }: PageParams) {
  const t = await getDictionary(lang)
  async function create(prevState: any, formData: FormData) {
    'use server'
    const response = await createAccount(formData)
    if (response instanceof Response) {
      return redirect(`/${lang}/auth/email-confirmation`)
    }
    return response;
  }
  return <Form t={t} action={create}/>
}