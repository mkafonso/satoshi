import 'dotenv/config'

import { buildApp } from './app'
import { env } from './helpers/env'

const app = buildApp()

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server is running on port ${env.PORT}`)
  })
