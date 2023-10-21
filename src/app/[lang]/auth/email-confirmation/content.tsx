'use client'
import { Box as BaseBox, Typography, styled } from '@mui/material';
import { Dictionary } from '@/utils/get_dictionaries';

const Box = styled(BaseBox)`
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
    <BaseBox pt={12} px={3}>
      <Box mt={10} p={3} mx='auto' sx={{ width: { xs: '100%', md: '25%' } }}>
        <Typography variant="h6" textAlign='center' fontWeight='bold'>
          {t.confirmation}
        </Typography>
      </Box>
    </BaseBox>
  )
}