import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, okRequest, serverError, unauthorized } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, EmailValidator, Authentication } from './login-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequets: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequets.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequets.body
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }
      return okRequest({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
