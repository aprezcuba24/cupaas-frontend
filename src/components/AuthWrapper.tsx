'use client'
import { ReactNode } from 'react';
import { Typography, Box } from '@mui/material';
import BtnSubmit from './Form/BtnSubmit';

type Props = {
  create: (formData: FormData) => Promise<void> | void;
  title: string;
  btn: string;
  footer: ReactNode,
  children: ReactNode | ReactNode[],
}

export default function AuthWrapper({
  create,
  title,
  btn,
  footer,
  children
}: Props) {
  return (
    <Box pt={12} px={3}>
      <Typography variant="h5" textAlign='center' fontWeight='bold'>
        {title}
      </Typography>
      <Box mt={10} mx='auto' sx={{ width: { xs: '100%', md: '25%' } }}>
        <form action={create}>
          {Array.isArray(children) ? children.map((item, index) => (
            <Box mb={5} key={index}>
              {item}
            </Box>
          )) : children}
          <BtnSubmit variant="contained" sx={{width: '100%'}}>
            {btn}
          </BtnSubmit>
        </form>
        <Box mt={5} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {footer}
        </Box>
      </Box>
    </Box>
  )
}