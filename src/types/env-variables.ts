import * as z from "zod"

export const EnvVariablesSchema = z.object({
  envVariables: z.any().array(),
})

export type TEnvVariablesSchema = z.infer<typeof EnvVariablesSchema>
