'use server'
import { request } from '@/utils/request';
import { cookies } from 'next/headers';

export type Team = {
  id?: string;
  name?: string;
}

export const getTeams = async (): Promise<Team[]> => {
  return request('GET', '/api/teams/').then(req => (req as unknown as Request).json())
}

export const setDefaultTeam = async () => {
  const teams = await getTeams();
  const firstTeam: Team = teams.length ? teams[0] : {}
  setCurrentTeam(firstTeam)
}

export const setCurrentTeam = (team: Team) => {
  return cookies().set('team', JSON.stringify(team))
}

export const getCurrentTeam = () => {
  const team = cookies().get('team')?.value
  return team ? JSON.parse(team) : {}
}