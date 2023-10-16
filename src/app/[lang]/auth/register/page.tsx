import WrapperAuth from '@/components/AuthWrapper'
import { TextField } from '@mui/material';
import { getDictionary } from '@/utils/get_dictionaries'
import Link from '@/components/Link';
import { PageParams } from '@/utils/types';

export default async function Page({ params: { lang } }: PageParams) {
  const t = await getDictionary(lang)
  async function create(formData: FormData) {
    'use server'
    console.log(
      Object.fromEntries(formData)
    );
  }
  const footer = (
    <Link href='/auth/login'>
      {t.register.login}
    </Link>
  )

  return (
    <WrapperAuth
      create={create}
      title={t.register.title}
      btn={t.register.btn}
      footer={footer}
    >
      <TextField
        label={t.register.email}
        variant="outlined"
        size="small"
        name="username"
        type="email"
        sx={{width: '100%'}}
        required
        autoComplete="email"
      />
      <TextField
        label={t.register.password}
        variant="outlined"
        size="small"
        name="password"
        type="password"
        sx={{width: '100%'}}
        required
        autoComplete="email"
      />
    </WrapperAuth>
  )
}