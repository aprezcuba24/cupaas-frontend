import { PropsWithChildren } from 'react';
import Link, { LinkProps } from 'next/link';

export default function BtnLink({ children, ...props }: PropsWithChildren & LinkProps) {
  return (
    <Link {...props} className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-blue-900 hover:bg-blue-700 text-white hover:text-white py-1 px-3'>
      { children }
    </Link>
  )
}