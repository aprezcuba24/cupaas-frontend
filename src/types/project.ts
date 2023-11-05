import * as z from "zod"
import { TBranch } from '@/types/branch';

export const ProjectSchema = z.object({
  name: z.string().min(2).max(50),
  git_url: z.string().url(),
  branches: z.any().array(),
})

export type TProject = {
  id?: string;
  commit: string;
  url: string;
  last_commit_at: string;
  env_variables: TBranch[];
} & z.infer<typeof ProjectSchema>