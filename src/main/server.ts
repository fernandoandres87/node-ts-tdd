import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import app from './config/app'
import env from './config/env'


MongoHelper.connect(env.mongoUrl)
  .then( async () =>{
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running on port http://localhost:${env.port}`))
  })
  .catch(console.error)