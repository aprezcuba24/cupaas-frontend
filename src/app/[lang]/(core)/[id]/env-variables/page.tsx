import { getCurrentDictionary } from '@/utils/get_dictionaries';
import FormEnvVariables from './form';
import { getBranches } from '@/services/branch';

type PageProps = {
  params: {
    id: string;
  }
}

export default async function Page({ params: { id } }: PageProps) {
  const t = await getCurrentDictionary();
  const branches = await getBranches(id)

  async function create(data) {
    'use server'
    console.log(data);
  }

  return (
    <div>
      <h2 className='mb-5'>{t.env_variable.title}</h2>
      <FormEnvVariables t={t} branches={branches} action={create} />
    </div>
  )
}