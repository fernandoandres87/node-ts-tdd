import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { adaptRoute } from '../adapters/express-routes-adapter'
import { makeAddSurveyController } from '../factories/controller/survey/add-survey/add-survey-controller-factory'
import { makeAuthMiddleware } from '../factories/middleware/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}
