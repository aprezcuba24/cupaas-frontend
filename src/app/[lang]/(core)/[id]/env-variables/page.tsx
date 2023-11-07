import { getCurrentDictionary } from '@/utils/get_dictionaries';
import FormEnvVariables from './form';
import { getBranches } from '@/services/branch';
import { getProject, updateProject } from '@/services/project';
import { TProject } from '@/types/project';

type PageProps = {
  params: {
    id: string;
  }
}

export default async function Page({ params: { id } }: PageProps) {
  const t = await getCurrentDictionary();
  const branches = await getBranches(id)
  const project = await getProject(id)

  const action = async (projectId: string, { env_variables }: TProject) => {
    'use server'
    const response = await updateProject(projectId, { env_variables })
    if (response instanceof Response) {
      return true;
    } else {
      return response;
    }
  }

  return (
    <div>
      <h2 className='mb-5'>{t.env_variable.title}</h2>
      <FormEnvVariables t={t} branches={branches} action={action} projectId={id} value={project} />
    </div>
  )
}