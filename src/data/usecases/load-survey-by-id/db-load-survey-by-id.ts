import { LoadSurveyByIdRepository, SurveyModel, LoadSurveyById } from './db-load-survey-by-id.protocols'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (private readonly loadSurveyByidRepository: LoadSurveyByIdRepository) {}
  async loadById (id: string): Promise<SurveyModel> {
    const survey = await this.loadSurveyByidRepository.loadById(id)
    return survey
  }
}
