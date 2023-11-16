import { ReactNode } from 'react';

type WrapperListProps = {
  children: ReactNode[],
}

export default function WrapperList({ children }: WrapperListProps) {
  return (
    <>
      <div className='mb-5 flex justify-between'>
        {children[0]}
      </div>
      <div className="grid gap-x-8 gap-y-4 grid-cols-1 md:grid-cols-3">
        {children[1]}
      </div>
    </>
  )
}