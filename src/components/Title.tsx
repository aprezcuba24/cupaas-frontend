import { PropsWithChildren } from 'react';

export default function Title({ children }: PropsWithChildren) {
  return (
    <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">
      {children}
    </h1>
  )
}