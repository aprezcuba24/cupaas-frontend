'use client'
import { useFormStatus } from 'react-dom';
import { Button, ButtonProps } from '@/components/ui/button';
import { ReloadIcon } from "@radix-ui/react-icons"


export default function BtnSubmit({ children, ...props }: ButtonProps ) {
  const { pending } = useFormStatus()
 
  return (
    <Button type='submit' disabled={pending} aria-disabled={pending} {...props}>
      {pending && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}