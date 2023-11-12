'use client'
import { ReactNode } from 'react';
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
    <div className='m-auto w-1/4 pt-12'>
      <h1 className='text-lg font-bold text-center'>{title}</h1>
      <form action={create} className='pt-5'>
        {Array.isArray(children) ? children.map((item, index) => (
          <div className='mb-5'key={index}>
            {item}
          </div>
        )) : children}
        <BtnSubmit className='w-full'>
          {btn}
        </BtnSubmit>
      </form>
      <div className='flex justify-between pt-5'>
        {footer}
      </div>
    </div>
  )
}