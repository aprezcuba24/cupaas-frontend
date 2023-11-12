import { request } from '@/utils/request';
import { getCurrentTeam } from '@/services/team';
import { TProject } from '@/types/project';
import { revalidateTag } from 'next/cache'

export const createProject = async (project: TProject) => {
  const currentTeam = getCurrentTeam()
  return request('POST', `/api/teams/${currentTeam.id}/projects/`, project)
}

export const updateProject = async (id: string, project: Partial<TProject>) => {
  const currentTeam = getCurrentTeam()
  const response = await request('PATCH', `/api/teams/${currentTeam.id}/projects/${id}/`, project)
  revalidateTag(`project_${id}}`)
  return response;
}

export const getProjects = async () => {
  const currentTeam = getCurrentTeam()
  return (await request('GET', `/api/teams/${currentTeam.id}/projects/`) as Response).json()
}

export const getProject = async (id: string) => {
  const currentTeam = getCurrentTeam()
  return (
    await request(
      'GET',
      `/api/teams/${currentTeam.id}/projects/${id}/`,
      null,
      { next: { tags: [`project_${id}}`] } }
    ) as Response).json()
}
