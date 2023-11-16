import { Skeleton } from "@/components/ui/skeleton"
import WrapperList from './wrapper_list';

export function ProjectListSuspense() {
  return (
    <>
      {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="h-[100px] rounded" />)}
    </>
  )
}

export default function LoadingSuspense() {
  return (
    <WrapperList>
      <>
        <Skeleton className="w-full mr-2 h-[30px] rounded" />
        <Skeleton className="w-[60px] h-[30px] rounded" />
      </>
      <ProjectListSuspense />
    </WrapperList>
  )
}