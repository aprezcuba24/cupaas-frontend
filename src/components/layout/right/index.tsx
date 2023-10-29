import TeamSelector from './TeamSelector';
import UserStatus from './user';
import { Dictionary } from '@/utils/get_dictionaries';
import { getTeams } from '@/services/team';
import { getCurrentTeam } from '@/services/team';

export default async function UserSetting({ t }: { t: Dictionary}) {
  const teams = await getTeams();
  const currentTeam = getCurrentTeam()
  return (
    <>
      <div className='mr-3'>
        <TeamSelector t={t} currentTeam={currentTeam} teams={teams}/>
      </div>
      <UserStatus />
    </>
  )
}