import { getCurrentTeam } from '@/services/team'
import { request } from '@/utils/request';
import { convert_dates } from '@/utils/convert_date';

export const getDeploys = async (projectId: string) => {
  const currentTeam = getCurrentTeam()
  const items = await (await request('GET', `/api/teams/${currentTeam.id}/projects/${projectId}/deploys/`) as Response).json()
  return convert_dates(items)
}
