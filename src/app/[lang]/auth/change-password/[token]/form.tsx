'use client'
import { Dictionary } from '@/utils/get_dictionaries';
import { Action, useServerForm } from '@/hooks/useServerForm';
import WrapperAuth from '@/components/AuthWrapper';
import GlobalError from '@/components/Form/GlobalError';
import Link from 'next/link';
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
        {t.change_password.login}
      </Link>
    </>
  )

  return (
    <WrapperAuth
      create={formAction}
      title={t.change_password.title}
      btn={t.change_password.btn}
      footer={footer}
    >
      <GlobalError errors={errors}/>
      <Input
        className={errors?.password && 'border-red-500'}
        placeholder={t.change_password.new_password}
        name="password"
        type='password'
        required
      />
      {errors?.password && <p className='text-red-500'>{errors.password}</p>}
      <Input
        className={errors?.repeat_password && 'border-red-500'}
        placeholder={t.change_password.repeat_password}
        name="repeat_password"
        type='password'
        required
      />
      {errors?.repeat_password && <p className='text-red-500'>{errors.repeat_password}</p>}
    </WrapperAuth>
  )
}