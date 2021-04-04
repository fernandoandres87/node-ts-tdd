import { Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-routes-adapter'
import { makeAddSurveyController } from '@/main/factories/controller/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '@/main/factories/controller/survey/load-surveys/load-surveys-controller-factory'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { auth } from '@/main/middlewares/auth'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
