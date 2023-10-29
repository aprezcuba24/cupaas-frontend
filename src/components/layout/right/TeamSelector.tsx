import { getTeams, Team } from '@/services/team';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import AddOption from './AddTeam'
import { Dictionary } from '@/utils/get_dictionaries';

export default async function TeamSelector({ t }: { t: Dictionary}) {
  const teams = await getTeams();
  const firstTeam: Team = teams.length ? teams[0] : {}
  return (
    <div className='flex'>
      <div className='mr-1'>
        <Select>
          <SelectTrigger className="w-[180px] text-white bg-gray-800 border-gray-800">
            <SelectValue placeholder={firstTeam.name}/>
          </SelectTrigger>
          <SelectContent>
            {teams.map(({ id, name }) => <SelectItem key={id} value="light">{name}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <AddOption t={t}/>
    </div>
  );
}
