import { PropsWithChildren, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export default function BtnDashed({ children, className, ...props }: PropsWithChildren & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={cn('border-dashed border-2 border-gray-500 h-8 cursor-text', className)}>
      {children}
    </button>
  )
}