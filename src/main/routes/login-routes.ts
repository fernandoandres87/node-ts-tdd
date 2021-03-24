import { Router } from 'express'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeLoginController } from '../factories/controller/login/login-controller-factory'
import { makeSignUpController } from '../factories/controller/signup/signup-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
