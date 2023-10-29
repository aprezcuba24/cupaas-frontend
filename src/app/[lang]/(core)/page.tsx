import Project from './project';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dictionary, getDictionary } from '../../../utils/get_dictionaries';
import { PageParams } from '../../../utils/types';

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

type Props = {
  t: Dictionary,
}

export default async function Home({ params: { lang } }: PageParams) {
  const t = await getDictionary(lang)
  return (
    <main>
      <div className='mb-5 flex justify-between'>
        <Input placeholder={t.projects_list.search_placeholder} className='mr-1' />
        <Button variant="outline" className='bg-blue-900 hover:bg-blue-700 text-white hover:text-white'>
          {t.projects_list.btn_new}
        </Button>
      </div>
      <div className="grid gap-x-8 gap-y-4 grid-cols-1 md:grid-cols-3">
        {projects.map(({ id, ...rest }) => (
          <Project key={id} data={{ id, ...rest }}/>
        ))}
      </div>
    </main>
  )
}
