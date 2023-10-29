import Project from './project';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

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

export default function Home() {
  return (
    <main>
      <div className='mb-5 flex justify-between'>
        <Input placeholder='Search...' className='mr-1' />
        <Button variant="outline" className='bg-blue-900 hover:bg-blue-700 text-white hover:text-white'>
          New
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
