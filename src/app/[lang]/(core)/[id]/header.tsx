'use client'
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Title from '@/components/Title';
import { usePathname } from 'next/navigation';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { TProject } from '@/types/project';
import { Dictionary } from '@/utils/get_dictionaries';

type HeaderProps = {
  lang: string,
  project: TProject,
  id: string,
  t: Dictionary
}

export default function Header({ lang, project, id, t }: HeaderProps) {
  const pathname = usePathname()
  const isDetail = pathname.endsWith('/detail')
  const isEdit = pathname.endsWith('/edit')
  const backRoute = isEdit ? `/${lang}/${id}/detail` : `/${lang}`

  return (
    <div className="flex">
      <Link href={backRoute}>
        <ArrowBackIcon className="mr-4" />
      </Link>
      <Title>{project ? project.name : t.project_form.title_new}</Title>
      {isDetail && (
        <div className="w-full flex justify-end">
          <Link
            className="border-primary border rounded h-8 w-8 flex justify-center items-center text-primary pl-1"
            href={`/${lang}/${id}/edit`}
          >
            <EditNoteIcon />
          </Link>
        </div>
      )}
    </div>
  )
}