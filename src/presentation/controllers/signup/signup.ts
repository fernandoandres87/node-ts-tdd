import { InvalidParamError } from '../../errors'
import { HttpResponse, HttpRequest, Controller, EmailValidator, AddAccount } from './signup-protocols'
import { badRequest, serverError, okRequest } from '../../helpers/http-helper'
import { Validation } from '../../helpers/validators/validation'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (emailValidator: EmailValidator, addAccount: AddAccount, validation: Validation) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequets: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequets.body)
      if (error) { return badRequest(error) }
      const { name, email, password, passwordConfirmation } = httpRequets.body
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      return okRequest(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
