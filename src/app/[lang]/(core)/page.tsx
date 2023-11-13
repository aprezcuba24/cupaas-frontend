import Project from './project';
import { Input } from "@/components/ui/input"
import { getDictionary } from '@/utils/get_dictionaries';
import { PageParams } from '@/utils/types';
import Link from 'next/link';
import { getProjects } from '@/services/project';
import { TProject } from '@/types/project';
import { ROUTE_NEW_PROJECT } from './[id]/new/page';
import { Button } from '@/components/ui/button';

export default async function Home({ params: { lang } }: PageParams) {
  const t = await getDictionary(lang)
  const projects: TProject[] = await getProjects()
  return (
    <main>
      <div className='mb-5 flex justify-between'>
        <Input placeholder={t.projects_list.search_placeholder} className='mr-1' />
        <Button>
          <Link href={ROUTE_NEW_PROJECT}>{t.projects_list.btn_new}</Link>
        </Button>
      </div>
      <div className="grid gap-x-8 gap-y-4 grid-cols-1 md:grid-cols-3">
        {projects.map(({ id, ...rest }) => (
          <Link key={id}  href={`${id}/detail`}>
            <Project data={{ id, ...rest }}/>
          </Link>
        ))}
      </div>
    </main>
  )
}
