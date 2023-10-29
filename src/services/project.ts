import { request } from '@/utils/request';
import { getCurrentTeam } from '@/services/team';

export const createProject = async (formData: FormData) => {
  const currentTeam = getCurrentTeam()
  return request('POST', `/api/teams/${currentTeam.id}/projects/`, formData)
}