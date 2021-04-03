import { LoadSurveys } from '../../../../domain/useCases/load-surveys'
import { okRequest } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load()
    return okRequest(surveys)
  }
}
