import { PlusIcon } from '@radix-ui/react-icons';
import { getCurrentDictionary } from '@/utils/get_dictionaries';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


export default async function AddTeam() {
  const t = await getCurrentDictionary()
  return (
    <div className='flex items-center'>
      <Dialog>
        <DialogTrigger className='h-6 w-6 rounded-full bg-gray-300'>
          <div className='ml-1'>
            <PlusIcon className="h-4 w-4" />
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