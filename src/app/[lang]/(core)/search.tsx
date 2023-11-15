'use client'

import { Input } from '@/components/ui/input';
import { Dictionary, Keys } from '@/utils/get_dictionaries';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

type SearchProps = {
  t: Dictionary
  lang: Keys
}

export default function Search({ t, lang }: SearchProps) {
  const [timer, setTimer] = useState<any>(null);
  const { push } = useRouter()
  const handleChange = useCallback(({ target: { value }}: React.ChangeEvent<HTMLInputElement>) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        push(`/${lang}?q=${value}`)
      }, 1000)
    );
  }, [timer, lang, push])

  return <Input className='w-full mr-2' placeholder={t.projects_list.search_placeholder} onChange={handleChange} />
}