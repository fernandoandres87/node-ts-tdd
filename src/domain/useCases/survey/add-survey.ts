import { SurveyModel } from '@/presentation/controllers/survey/load-surveys/load-surveys-controller-protocols'

export type AddSurveyParams = Omit<SurveyModel, 'id'>

export interface AddSurvey {
  add: (data: AddSurveyParams) => Promise<void>
}
