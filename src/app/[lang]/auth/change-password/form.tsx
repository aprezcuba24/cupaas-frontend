'use client'
import { Dictionary } from '@/utils/get_dictionaries';
import { Action, useServerForm } from '@/hooks/useServerForm';
import Link from 'next/link';
import WrapperAuth from '@/components/AuthWrapper';
import GlobalError from '@/components/Form/GlobalError';
import { Input } from '@/components/ui/input';

type Props = {
  t: Dictionary,
  action: Action,
}

export default function Form({ t, action }: Props) {
  const [ { errors }, formAction ] = useServerForm(action);

  const footer = (
    <>
      <Link href='/auth/login'>
        {t.send_password_recover.login}
      </Link>
    </>
  )

  return (
    <WrapperAuth
      create={formAction}
      title={t.send_password_recover.title}
      btn={t.send_password_recover.btn}
      footer={footer}
    >
      <GlobalError errors={errors}/>
      <Input
        className={errors?.email && 'border-red-500'}
        placeholder={t.send_password_recover.email}
        name="email"
        type='email'
        required
      />
      {errors?.email && <p className='text-red-500'>{errors.email}</p>}
    </WrapperAuth>
  )
}