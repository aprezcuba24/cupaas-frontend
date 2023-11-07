import * as z from "zod"

export const EnvVariablesSchema = z.object({
  name: z.string(),
  value: z.string(),
  branch: z.string(),
})

export type TEnvVariablesSchema = z.infer<typeof EnvVariablesSchema>
