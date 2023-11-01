import { useMemo } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import GitHubIcon from '@mui/icons-material/GitHub';
import { Badge } from "@/components/ui/badge"
import { TProject } from '@/types/project';

const COMMIT_MAX_LENGTH = 40

export default function Project({ data }: { data: TProject }) {
  const commitText = useMemo(
    () => data.commit && data.commit.length > COMMIT_MAX_LENGTH ? data.commit.slice(0, COMMIT_MAX_LENGTH) + '...' : data.commit,
    [data.commit]
  )
  return (
    <Card>
      <CardHeader className="pb-1">
        <CardTitle>
          <GitHubIcon className="mr-2"/>
          {data.name}
        </CardTitle>
        <CardDescription>{data.url}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex justify-between'>
          <strong>{commitText}</strong>
          <CardDescription>{data.last_commit_at}</CardDescription>
        </div>
        {data.branches.map(({ id, ref }) => <Badge key={id} className='mr-1'>{ref}</Badge> )}
      </CardContent>
    </Card>
  )
}