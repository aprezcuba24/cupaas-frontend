import { getCurrentDictionary } from '@/utils/get_dictionaries';
import FormEnvVariables from './form';
import { getBranches } from '@/services/branch';
import { TBranch } from '@/types/branch';
import { getProject, updateProject } from '@/services/project';

type PageProps = {
  params: {
    id: string;
  }
}

export default async function Page({ params: { id } }: PageProps) {
  const t = await getCurrentDictionary();
  const branches = await getBranches(id)
  const project = await getProject(id)

  const action = async (projectId: string, { env_variables }: { env_variables: TBranch[]}) => {
    'use server'
    return (await updateProject(projectId, { env_variables }) as Response).json()
  }

  return (
    <div>
      <h2 className='mb-5'>{t.env_variable.title}</h2>
      <FormEnvVariables t={t} branches={branches} action={action} projectId={id} value={project.env_variables} />
    </div>
  )
}