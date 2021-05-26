import { Controller, HttpRequest, HttpResponse } from './load-surveys-controller-protocols'
import { LoadSurveys } from '@/domain/useCases/survey/load-surveys'
import { noContent, okRequest, serverError } from '@/presentation/helpers/http/http-helper'

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
