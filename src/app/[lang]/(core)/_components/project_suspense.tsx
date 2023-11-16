import { TProject } from '@/types/project';
import { getProjects } from '@/services/project';
import ProjectList, { ProjectListProps} from './project_list';
import { getCurrentTeam, setDefaultTeam } from '@/services/team';

export default async function ProjectListSuspense({ q, t, lang }: Omit<ProjectListProps, 'projects'>) {
  const currentTeam = getCurrentTeam()
  if (!currentTeam.id) {
    await setDefaultTeam()
  }
  const projects: TProject[] = await getProjects(q)

  return <ProjectList projects={projects} q={q} t={t} lang={lang} />
}