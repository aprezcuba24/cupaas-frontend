import { getDictionary } from '@/utils/get_dictionaries';
import { PageParams } from '@/utils/types';

export default async function Page({ params: { lang } }: PageParams) {
  const t = await getDictionary(lang)
  return (
    <div className='w-1/4 m-auto mt-12 bg-blue-600 p-10 rounded text-white font-bold'>
      {t.confirmation}
    </div>
  )
}