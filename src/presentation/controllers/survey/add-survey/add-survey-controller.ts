import { Controller, HttpRequest, HttpResponse, AddSurvey, Validation } from './add-survey-controller-protocols'
import { badRequest, serverError } from '../../../helpers/http/http-helper'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {}

  async handle (httpRequets: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequets.body)
      if (error) {
        return badRequest(error)
      }
      const { question, answers } = httpRequets.body
      await this.addSurvey.add({
        question,
        answers
      })
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
