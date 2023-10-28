'use client'
import { useFormStatus } from 'react-dom';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { PropsWithChildren } from 'react';


export default function BtnSubmit({ children, ...props }: PropsWithChildren & LoadingButtonProps) {
  const { pending } = useFormStatus()
 
  return (
    <LoadingButton type="submit" loading={pending} aria-disabled={pending} {...props}>
      {children}
    </LoadingButton>
  )
}