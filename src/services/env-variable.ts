import { request } from '@/utils/request';
import { getCurrentTeam } from '@/services/team';

export const createEnvVariable = async (projectId: string, envVariable: any) => {
  const currentTeam = getCurrentTeam()
  return request('POST', `/api/teams/${currentTeam.id}/projects/${projectId}/env-variables/`, envVariable)
}