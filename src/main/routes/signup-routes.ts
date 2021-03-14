import { Router } from 'express'
import { MakeSignUpController } from '../factories/signup'
import { adaptRoute } from '../adapters/express-routes-adapter'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(MakeSignUpController()))
}
