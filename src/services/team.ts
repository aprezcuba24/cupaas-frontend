import { request } from '@/utils/request';

export type Team = {
  id?: string;
  name?: string;
}

export const getTeams = async (): Promise<Team[]> => {
  return request('GET', '/api/teams/').then(req => (req as unknown as Request).json())
}