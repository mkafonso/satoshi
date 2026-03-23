import 'dotenv/config'
import { z } from 'zod'

export const schema = z.object({
  PORT: z.coerce.number().default(3001),
  NODE_ENV: z.enum(['dev', 'test', 'prd']).default('dev'),
  PAYMENT_LINK_EXPIRES_IN_MINUTES: z.coerce.number().default(15),
})

export function parseEnv(env: NodeJS.ProcessEnv) {
  const result = schema.safeParse(env)

  if (!result.success) {
    console.error('Invalid environment variables', z.treeifyError(result.error))

    throw new Error('Invalid environment variables')
  }

  return result.data
}

export const env = parseEnv(process.env)
