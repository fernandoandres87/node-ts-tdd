import { Validation } from '../../../protocols'
import { Controller, HttpRequest, HttpResponse } from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequets: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequets.body)
    return new Promise(resolve => resolve(null))
  }
}
