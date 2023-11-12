'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { TProject } from '@/types/project';
import { Dictionary } from '@/utils/get_dictionaries';
import { useMemo, useState, useCallback } from 'react';

type RemoveProps = {
  project: TProject,
  t: Dictionary,
  removeProject: (id: string) => void,
}

export default function RemoveProject({ project, t, removeProject }: RemoveProps) {
  const [name, setName] = useState('')
  const btnDisable = useMemo(() => project.name != name, [name, project.name])
  const handleRemove = useCallback(() => {
    return removeProject(project.id as string)
  }, [project.id, removeProject])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon">
          <DeleteForeverIcon  />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.remove_project.title}</DialogTitle>
          <DialogDescription>
            <div className="text-container" dangerouslySetInnerHTML={{ __html: t.remove_project.description }} />
            <strong>{project.name}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input autocomplete="off" aria-autocomplete="none"  id="name" value={name} onChange={({ target: { value }}) => setName(value)} className="col-span-3" />
        </div>
        <DialogFooter>
          <Button variant="destructive" disabled={btnDisable} onClick={handleRemove}>{t.remove_project.btn}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}