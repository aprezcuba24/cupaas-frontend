import { Lang } from '@/utils/types';
import { getDictionary } from '@/utils/get_dictionaries';
import { changePassword } from '@/services/auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import Form from './form';
import { validate } from '@/utils/form';

const ChangePasswordSchema = z.object({
  password: z.string(),
  repeat_password: z.string(),
}).refine(
  ({ password, repeat_password }) => {
    return password === repeat_password;
  },
  {
    message: "Passwords must match!",
    path: ["repeat_password"],
  }
);

type Props = {
  params: Lang & {
    token: string
  }
}

export default async function Page({ params: { lang, token } }: Props) {
  const t = await getDictionary(lang)
  async function create(prevState: any, formData: FormData) {
    'use server'
    const [errors, isValid] = validate<typeof ChangePasswordSchema>(ChangePasswordSchema, formData)
    if (!isValid) {
      return errors;
    }
    const response = await changePassword(formData, token)
    if (response instanceof Response) {
      return redirect(`/${lang}/auth/change-password/message`)
    }
    return response;
  }
  return <Form t={t} action={create}/>
}