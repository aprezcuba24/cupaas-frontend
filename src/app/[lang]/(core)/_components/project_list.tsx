'use client'
import Link from 'next/link';
import { TProject } from '@/types/project';
import Project from './project';
import { Button } from '@/components/ui/button';
import { Dictionary, Keys } from '@/utils/get_dictionaries';
import { ROUTE_NEW_PROJECT } from '../[id]/new/constants';
import { Input } from '@/components/ui/input';
import { ProjectListSuspense } from './suspense';
import { useProjectList } from './useProjectList';
import WrapperList from './wrapper_list';

export type ProjectListProps = {
  projects: TProject[],
  q: string,
  lang: Keys,
  t: Dictionary,
}

export default function ProjectList({ projects, q, t, lang }: ProjectListProps) {
  const { loading, onChange, search } = useProjectList(q, lang)

  return (
    <WrapperList>
      <>
        <Input
            className='w-full mr-2'
            value={search}
            placeholder={t.projects_list.search_placeholder}
            onChange={onChange}
          />
          <Button>
            <Link href={ROUTE_NEW_PROJECT}>{t.projects_list.btn_new}</Link>
          </Button>
      </>
      <>
        {loading ? <ProjectListSuspense /> : (
          <>
            {projects.map(({ id, ...rest }) => (
              <Link key={id}  href={`${id}/detail`}>
                <Project data={{ id, ...rest }}/>
              </Link>
            ))}
          </>
        )}
      </>
    </WrapperList>
  )
}