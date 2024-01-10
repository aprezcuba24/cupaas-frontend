import { getDeploy } from '@/services/deploy';
import { getCurrentDictionary } from '@/utils/get_dictionaries';
import { getDeployMercure } from '@/services/deploy';
import Detail from './_components/detail';

type PageProps = {
  params: {
    id: string;
    deploy_id: string;
  }
}

export default async function Page({ params: { id, deploy_id } }: PageProps) {
  const t = await getCurrentDictionary();
  const deploy = await getDeploy(id, deploy_id)
  const mercure = await getDeployMercure(id, deploy_id)
  return <Detail t={t} deploy={deploy} mercure={mercure} />
}