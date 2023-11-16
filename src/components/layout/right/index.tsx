import TeamSelector from './TeamSelector';
import UserStatus from './user';
import { getTeams } from '@/services/team';
import { getCurrentTeam } from '@/services/team';
import { getCurrentUser } from '@/services/auth';
import { getCurrentLang, getCurrentDictionary } from '@/utils/get_dictionaries';

export default async function UserSetting() {
  const teams = await getTeams();
  const currentTeam = getCurrentTeam()
  const user = await getCurrentUser()
  const lang = getCurrentLang()
  const t = await getCurrentDictionary()

  return (
    <>
      <div className='mr-3'>
        <TeamSelector currentTeam={currentTeam} teams={teams}/>
      </div>
      <UserStatus user={user} lang={lang} t={t} />
    </>
  )
}