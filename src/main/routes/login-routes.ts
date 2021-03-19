import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeLoginController } from '../factories/login/login-factory'
import { MakeSignUpController } from '../factories/signup/signup-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(MakeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
