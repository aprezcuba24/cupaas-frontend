import { login } from '@/services/auth'
import { redirect } from 'next/navigation'
import { getDictionary, Keys } from '@/utils/get_dictionaries'
import { Button, Typography, TextField, Box } from '@mui/material';


type PageParams = {
  params: {
    lang: Keys,
  }
}

export default async function Page({ params: { lang } }: PageParams) {
  const t = await getDictionary(lang)
  async function create(formData: FormData) {
    'use server'
    await login(formData)
    return redirect('/')
  }
 
  return (
    <Box pt={12} px={3}>
      <Typography variant="h5" textAlign='center' fontWeight='bold'>
        {t.sign_in.title}
      </Typography>
      <Box mt={10} mx='auto' sx={{ width: { xs: '100%', md: '25%' } }}>
        <form action={create}>
          <Box mb={5}>
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
          </Box>
          <Box mb={5}>
            <Box mt={2}>
              <TextField
                label={t.sign_in.password}
                variant="outlined"
                size="small"
                name="password"
                type="password"
                sx={{width: '100%'}}
                required
                autoComplete="current-password"
              />
            </Box>
          </Box>
          <Button variant="contained" sx={{width: '100%'}} type='submit'>
            {t.sign_in.btn}
          </Button>
        </form>
        <Box mt={5} sx={{ display: 'flex', flexDirection: 'column' }}>
          <a href="#">
            {t.sign_in.register}
          </a>
          <a href="#">
            {t.sign_in.forgot_password}
          </a>
        </Box>
      </Box>
    </Box>
  )
}