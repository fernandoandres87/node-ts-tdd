import {
  AddSurvey,
  AddSurveyModel,
  AddSurveyRepository
} from './db-add-survey-protocols'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRespository: AddSurveyRepository) {}

  async add (data: AddSurveyModel): Promise<void> {
    await this.addSurveyRespository.add(data)
  }
}
