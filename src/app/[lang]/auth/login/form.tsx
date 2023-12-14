'use client'
import { Dictionary } from '@/utils/get_dictionaries';
import { Action, useServerForm } from '@/hooks/useServerForm';
import WrapperAuth from '@/components/AuthWrapper';
import GlobalError from '@/components/Form/GlobalError';
import Link from 'next/link'
import { Input } from '@/components/ui/input';

type Props = {
  t: Dictionary,
  action: Action,
}

export default function Form({ t, action }: Props) {
  const [ { errors }, formAction ] = useServerForm(action) as any; // TODO: check the errors field.

  const footer = (
    <>
      <Link href='/auth/register'>
        {t.sign_in.register}
      </Link>
      <Link href='/auth/change-password'>
        {t.sign_in.forgot_password}
      </Link>
    </>
  )

  return (
    <WrapperAuth
      create={formAction}
      title={t.sign_in.title}
      btn={t.sign_in.btn}
      footer={footer}
    >
      <GlobalError errors={errors}/>
      <Input name='username' placeholder="email" required />
      <Input name="password" placeholder="password" type="password" required />
    </WrapperAuth>
  )
}