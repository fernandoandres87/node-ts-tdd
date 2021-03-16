import { HttpResponse, HttpRequest, Controller, AddAccount } from './signup-protocols'
import { badRequest, serverError, okRequest } from '../../helpers/http/http-helper'
import { Validation } from '../../helpers/validators/validation'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly validation: Validation

  constructor (addAccount: AddAccount, validation: Validation) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequets: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequets.body)
      if (error) { return badRequest(error) }
      const { name, email, password } = httpRequets.body
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
