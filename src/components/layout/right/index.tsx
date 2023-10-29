import TeamSelector from './TeamSelector';
import UserStatus from './user';
import { getTeams } from '@/services/team';
import { getCurrentTeam } from '@/services/team';

export default async function UserSetting() {
  const teams = await getTeams();
  const currentTeam = getCurrentTeam()
  return (
    <>
      <div className='mr-3'>
        <TeamSelector currentTeam={currentTeam} teams={teams}/>
      </div>
      <UserStatus />
    </>
  )
}