import { AccountModel } from '@/presentation/middlewares/auth-middleware-protocols'

export type AddSurveyModel = Omit<AccountModel, 'id'>

export interface AddSurvey {
  add (data: AddSurveyModel): Promise<void>
}
