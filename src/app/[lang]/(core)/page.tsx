import Project from './project';
import { Input } from "@/components/ui/input"
import { getDictionary } from '@/utils/get_dictionaries';
import { PageParams } from '@/utils/types';
import Link from 'next/link';
import { getProjects } from '@/services/project';
import { TProject } from '@/types/project';

const projects = [
  {
    id: 1,
    name: 'Bucanero',
    url: 'https://bucanero.com',
    commit: 'Fixed bug',
    time: '25 days ago',
    branch: 'development',
  },
  {
    id: 2,
    name: 'Etecsa',
    url: 'https://etecsa.com',
    commit: 'Home page added',
    time: '3 days ago',
    branch: 'main',
  },
  {
    id: 3,
    name: 'Guía de negocio',
    url: 'https://guia.com',
    commit: 'Refactor of user authenticate and fix the data base connection',
    time: '20 days ago',
    branch: 'dev',
  },
]

export default async function Home({ params: { lang } }: PageParams) {
  const t = await getDictionary(lang)
  const projects: TProject[] = await getProjects()
  return (
    <main>
      <div className='mb-5 flex justify-between'>
        <Input placeholder={t.projects_list.search_placeholder} className='mr-1' />
        <Link href={'new'} className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-blue-900 hover:bg-blue-700 text-white hover:text-white py-1 px-3'>
          {t.projects_list.btn_new}
        </Link>
      </div>
      <div className="grid gap-x-8 gap-y-4 grid-cols-1 md:grid-cols-3">
        {projects.map(({ id, ...rest }) => (
          <Link key={id}  href={'/'}>
            <Project data={{ id, ...rest }}/>
          </Link>
        ))}
      </div>
    </main>
  )
}
