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
      <FormControl error={errors?.email}>
        <TextField
          label={t.send_password_recover.email}
          variant="outlined"
          size="small"
          name="email"
          type="email"
          sx={{width: '100%'}}
          required
          autoComplete="email"
        />
      </FormControl>
    </WrapperAuth>
  )
}