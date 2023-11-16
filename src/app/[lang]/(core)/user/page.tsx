import { getCurrentUser } from '@/services/auth';
import Title from '@/components/Title';
import { getCurrentDictionary } from '@/utils/get_dictionaries';
import { Row } from '@/components/Row';

export default async function Page() {
  const user = await getCurrentUser();
  const t = await getCurrentDictionary()

  return (
    <div>
      <Title>{t.account_page.title}</Title>
      <Row label={t.account_page.name}>{user.name}</Row>
      <Row label={t.account_page.email}>{user.email}</Row>
    </div>
  )
}