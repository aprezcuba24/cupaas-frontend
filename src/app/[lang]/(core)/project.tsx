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

const COMMIT_MAX_LENGTH = 40

export default function Project({ data }: { data: any }) {
  const commitText = useMemo(
    () => data.commit.length > COMMIT_MAX_LENGTH ? data.commit.slice(0, COMMIT_MAX_LENGTH) + '...' : data.commit,
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
        <strong>{commitText}</strong>
        <div className='flex justify-between'>
          <CardDescription>{data.time}</CardDescription>
          <Badge>{data.branch}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}