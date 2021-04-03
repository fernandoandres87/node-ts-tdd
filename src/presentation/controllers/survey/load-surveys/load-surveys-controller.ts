import { LoadSurveys } from '../../../../domain/useCases/load-surveys'
import { noContent, okRequest, serverError } from '../../../helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return surveys.length ? okRequest(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
