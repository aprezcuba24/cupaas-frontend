'use client'
import { Dictionary } from '@/utils/get_dictionaries';
import { Action, useServerForm } from '@/hooks/useServerForm';
import Link from '@/components/Link';
import WrapperAuth from '@/components/AuthWrapper';
import { TextField } from '@mui/material';
import FormControl from '@/components/Form/FormControl';
import GlobalError from '@/components/Form/GlobalError';

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
      <FormControl error={errors?.password}>
        <TextField
          label={t.change_password.new_password}
          variant="outlined"
          size="small"
          name="password"
          type="password"
          sx={{width: '100%'}}
          required
          autoComplete="email"
        />
      </FormControl>
      <FormControl error={errors?.repeat_password}>
        <TextField
          label={t.change_password.repeat_password}
          variant="outlined"
          size="small"
          name="repeat_password"
          type="password"
          sx={{width: '100%'}}
          required
          autoComplete="email"
        />
      </FormControl>
    </WrapperAuth>
  )
}