import AddIcon from '@mui/icons-material/Add';
import { Dictionary } from '@/utils/get_dictionaries';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default function AddTeam({ t }: { t: Dictionary}) {
  return (
    <div className='flex items-center'>
      <Dialog>
        <DialogTrigger className='h-6 w-6 rounded-full bg-gray-300'>
          <div className='-mt-1'>
            <AddIcon className="h-4 w-4" />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.team_modal.title}</DialogTitle>
            <DialogDescription>{t.team_modal.body}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}