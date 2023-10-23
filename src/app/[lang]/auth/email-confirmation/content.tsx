'use client'
import { Box, Typography } from '@mui/material';
import { Dictionary } from '@/utils/get_dictionaries';
import BoxMessage from '@/components/BoxMessage';

type Props = {
  t: Dictionary,
  lang: string,
}

export default function Content({ lang, t }: Props) {
  return (
    <Box pt={12} px={3}>
      <BoxMessage mt={10} p={3} mx='auto' sx={{ width: { xs: '100%', md: '25%' } }}>
        <Typography variant="h6" textAlign='center' fontWeight='bold'>
          {t.confirmation}
        </Typography>
      </BoxMessage>
    </Box>
  )
}