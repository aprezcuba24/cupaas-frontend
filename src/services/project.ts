import { request } from '@/utils/request';
import { getCurrentTeam } from '@/services/team';
import { TProject } from '@/types/project';

export const createProject = async (project: TProject) => {
  const currentTeam = getCurrentTeam()
  return request('POST', `/api/teams/${currentTeam.id}/projects/`, project)
}

export const getProjects = async () => {
  const currentTeam = getCurrentTeam()
  return (await request('GET', `/api/teams/${currentTeam.id}/projects/`) as Response).json()
}
