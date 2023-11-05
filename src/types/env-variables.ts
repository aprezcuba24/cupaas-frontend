import * as z from "zod"

export const EnvVariablesSchema = z.object({
  env_variables: z.any().array(),
})

export type TEnvVariablesSchema = z.infer<typeof EnvVariablesSchema>
