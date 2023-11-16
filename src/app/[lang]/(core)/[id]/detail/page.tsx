import { getProject } from '@/services/project';
import { TProject } from '@/types/project';
import { getDictionary, Keys } from '@/utils/get_dictionaries';
import { Badge } from '@/components/ui/badge';
import { Row } from '@/components/Row';

type PageProps = {
  params: {
    id: string;
    lang: Keys;
  }
}

export default async function Page({ params: { id, lang } }: PageProps) {
  const project: TProject = await getProject(id);
  const t = await getDictionary(lang)
  return <div>
    <Row label={t.project_form.git_url}>{project.git_url}</Row>
    <Row label={t.project_form.branches}>
      {project.branches.map(({ id, ref }) => <Badge key={id} className='mr-1'>{ref}</Badge> )}
    </Row>
  </div>
}