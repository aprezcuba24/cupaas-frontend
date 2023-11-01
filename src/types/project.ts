import * as z from "zod"

export const ProjectSchema = z.object({
  name: z.string().min(2).max(50),
  git_url: z.string().url(),
  branches: z.any().array(),
})

export type Project = z.infer<typeof ProjectSchema>