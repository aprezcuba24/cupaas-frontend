import { getDictionary } from '@/utils/get_dictionaries';
import { PageParams } from '@/utils/types';
import { Suspense } from 'react';
import ProjectSuspense from './_components/project_suspense';
import LoadingSuspense from './_components/suspense';

type HomeProps = {
  searchParams: {
    q: string,
  }
}

export default async function Home({ params: { lang }, searchParams: { q } }: HomeProps & PageParams) {
  const t = await getDictionary(lang)
  return (
    <main>
      <Suspense fallback={<LoadingSuspense />}>
        <ProjectSuspense q={q} t={t} lang={lang}/>
      </Suspense>
    </main>
  )
}
