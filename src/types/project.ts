import * as z from "zod"
import { EnvVariablesSchema } from '@/types/env-variables';

export const ProjectSchema = z.object({
  name: z.string().min(2).max(50),
  git_url: z.string().url(),
  branches: z.any().array(),
  env_variables: z.array(EnvVariablesSchema),
})

export type TProject = {
  id?: string;
  commit: string;
  url: string;
  last_commit_at: string;
} & z.infer<typeof ProjectSchema>