import { PropsWithChildren } from 'react';

export const Row = ({ label, children }: { label: string } & PropsWithChildren) => (
  <div className='flex flex-col mb-2 bg-gray-300 p-2 rounded-sm'>
    <div className='text-lg font-semibold'>{label}</div>
    <div className='bg-gray-100 p-2 rounded-sm'>{children}</div>
  </div>
);