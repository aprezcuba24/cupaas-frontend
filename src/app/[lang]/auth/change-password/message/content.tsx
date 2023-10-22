'use client'
import { Box, Typography, styled } from '@mui/material';
import { Dictionary } from '@/utils/get_dictionaries';
import Link from '@/components/Link';

const BoxMessage = styled(Box)`
  background: rgb(255, 238, 205);
  color: rgb(84, 101, 111);
  border-radius: 10px;
`

type Props = {
  t: Dictionary,
  lang: string,
}

export default function Content({ lang, t }: Props) {
  return (
    <Box pt={12} px={3}>
      <Box mt={10} mx='auto' sx={{ width: { xs: '100%', md: '25%' } }}>
        <BoxMessage p={3} mb={2}>
          <Typography variant="h6" textAlign='center' fontWeight='bold'>
            {t.change_password.message}
          </Typography>
        </BoxMessage>
        <Link href='/auth/login'>
          {t.change_password.login}
        </Link>
      </Box>
    </Box>
  )
}