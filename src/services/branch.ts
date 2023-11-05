import { getCurrentTeam } from '@/services/team'
import { request } from '@/utils/request';

export const getBranches = async (projectId: string) => {
  const currentTeam = getCurrentTeam()
  return (await request('GET', `/api/teams/${currentTeam.id}/projects/${projectId}/branches/`) as Response).json()
}
