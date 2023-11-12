'use client'
import { useServerForm, Action } from '@/hooks/useServerForm';
import WrapperAuth from '@/components/AuthWrapper';
import { Dictionary } from '@/utils/get_dictionaries';
import Link from 'next/link';
import { Input } from '@/components/ui/input';

type Props = {
  t: Dictionary,
  action: Action,
}

export default function Form({ t, action }: Props) {
  const [ { errors }, formAction ] = useServerForm(action);

  const footer = (
    <Link href='/auth/login'>
      {t.register.login}
    </Link>
  )

  return (
    <WrapperAuth
      create={formAction}
      title={t.register.title}
      btn={t.register.btn}
      footer={footer}
    >
      <Input className={errors?.name && 'border-red-500'} placeholder={t.register.name} name="name" required />
      {errors?.name && <p className='text-red-500'>{errors.name}</p>}
      <Input className={errors?.email && 'border-red-500'} placeholder={t.register.email} name="email" required />
      {errors?.email && <p className='text-red-500'>{errors.email}</p>}
    </WrapperAuth>
  )
}