'use client'
import Link from 'next/link';
import { ArrowLeftIcon, Pencil2Icon } from '@radix-ui/react-icons';
import Title from '@/components/Title';
import { usePathname } from 'next/navigation';
import { TProject } from '@/types/project';
import { Dictionary } from '@/utils/get_dictionaries';
import RemoveProject from './remove';
import { Button } from '@/components/ui/button';

type HeaderProps = {
  lang: string,
  project: TProject,
  id: string,
  t: Dictionary
  removeProject: (id: string) => void,
}

export default function Header({ lang, project, id, t, removeProject }: HeaderProps) {
  const pathname = usePathname()
  const isDetail = pathname.endsWith('/detail')
  const isEdit = pathname.endsWith('/edit')
  const backRoute = isEdit ? `/${lang}/${id}/detail` : `/${lang}`

  return (
    <div className="flex">
      <Link href={backRoute}>
        <ArrowLeftIcon className="mr-4" width="25" height="25" />
      </Link>
      <Title>{project ? project.name : t.project_form.title_new}</Title>
      {isDetail && (
        <div className="w-full flex justify-end">
          <Button asChild size="icon" variant="outline" className='mr-3'>
            <Link href={`/${lang}/${id}/edit`}>
              <Pencil2Icon />
            </Link>
          </Button>
          <RemoveProject project={project} t={t} removeProject={removeProject}/>
        </div>
      )}
    </div>
  )
}