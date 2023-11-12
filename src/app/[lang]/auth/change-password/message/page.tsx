import { getDictionary } from '@/utils/get_dictionaries';
import { PageParams } from '@/utils/types';
import Link from 'next/link';

export default async function Page({ params: { lang } }: PageParams) {
  const t = await getDictionary(lang)
  return (
    <div className='w-1/4 m-auto mt-12'>
      <div className='bg-blue-600 mb-5 p-10 rounded text-white font-bold'>
        {t.change_password.message}
      </div>
      <Link href='/auth/login'>
        {t.change_password.login}
      </Link>
    </div>
  )
}