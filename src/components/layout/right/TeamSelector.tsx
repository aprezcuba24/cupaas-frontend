import { Team } from '@/services/team';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import AddOption from './AddTeam'
import { Dictionary } from '@/utils/get_dictionaries';

export default function TeamSelector({ t, currentTeam, teams }: { t: Dictionary, currentTeam: Team, teams: Team[]}) {
  return (
    <div className='flex'>
      <div className='mr-1'>
        <Select>
          <SelectTrigger className="w-[180px] text-white bg-gray-800 border-gray-800">
            <SelectValue placeholder={currentTeam.name}/>
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
