import { getDeploy } from '@/services/deploy';
import { Row } from '@/components/Row';
import { getCurrentDictionary } from '@/utils/get_dictionaries';
import Steps from './_components/steps';
import VariantBadge from '../../_components/variant-badge';

type PageProps = {
  params: {
    id: string;
    deploy_id: string;
  }
}

export default async function Page({ params: { id, deploy_id } }: PageProps) {
  const t = await getCurrentDictionary();
  const deploy = await getDeploy(id, deploy_id)
  return (
    <>
      <h2 className='mb-5'>{t.deploy.title_single}</h2>
      <Row label={t.deploy.status}>
        <VariantBadge>{deploy.status}</VariantBadge>
      </Row>
      <Row label={t.deploy.branch}>{deploy.ref}</Row>
      <Row label={t.deploy.date}>{deploy.created_at.toString()}</Row>
      <Row label={t.deploy.commit}>commit...</Row>
      <Steps t={t} deploy={deploy} />
    </>
  )
}