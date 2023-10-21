'use client'
import { useServerForm, Action } from '@/hooks/useServerForm';
import WrapperAuth from '@/components/AuthWrapper';
import { TextField } from '@mui/material';
import { Dictionary } from '@/utils/get_dictionaries';
import Link from '@/components/Link';
import FormControl from '@/components/Form/FormControl';

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
      <FormControl error={errors?.name}>
        <TextField
          label={t.register.name}
          variant="outlined"
          size="small"
          name="name"
          type="text"
          sx={{width: '100%'}}
          required
        />
      </FormControl>
      <FormControl error={errors?.email}>
        <TextField
          label={t.register.email}
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