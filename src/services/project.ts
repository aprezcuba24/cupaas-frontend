import { request } from '@/utils/request';
import { getCurrentTeam } from '@/services/team';
import { Project } from '@/types/project';

export const createProject = async (project: Project) => {
  const currentTeam = getCurrentTeam()
  return request('POST', `/api/teams/${currentTeam.id}/projects/`, project)
}