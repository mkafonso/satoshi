import 'dotenv/config'

import { app } from './app'

app
  .listen({
    host: '0.0.0.0',
    port: 3001,
  })
  .then(() => {
    console.log('Server is running on port 3001')
  })
