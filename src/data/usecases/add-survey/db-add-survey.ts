import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { AddSurvey, AddSurveyModel } from './db-add-survey-protocols'

export class DbAddSurvey implements AddSurvey {
  constructor (private readonly addSurveyRespository: AddSurveyRepository) {}

  async add (data: AddSurveyModel): Promise<void> {
    await this.addSurveyRespository.add(data)
  }
}
