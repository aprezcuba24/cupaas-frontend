'use client'
import { Dictionary } from '@/utils/get_dictionaries';
import { Action, useServerForm } from '@/hooks/useServerForm';
import Link from '@/components/Link';
import WrapperAuth from '@/components/AuthWrapper';
import { TextField } from '@mui/material';
import FormControl from '@/components/Form/FormControl';
import GlobalError from '../../../../components/Form/GlobalError';

type Props = {
  t: Dictionary,
  action: Action,
}

export default function Form({ t, action }: Props) {
  const [ { errors }, formAction ] = useServerForm(action);

  const footer = (
    <>
      <Link href='/auth/register'>
        {t.sign_in.register}
      </Link>
      <Link href="#">
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
      <FormControl error={errors?.name}>
        <TextField
          label={t.sign_in.email}
          variant="outlined"
          size="small"
          name="username"
          type="email"
          sx={{width: '100%'}}
          required
          autoComplete="email"
        />
      </FormControl>
      <FormControl error={errors?.name}>
        <TextField
          label={t.sign_in.password}
          variant="outlined"
          size="small"
          name="password"
          type="password"
          sx={{width: '100%'}}
          required
          autoComplete="email"
        />
      </FormControl>
    </WrapperAuth>
  )
}