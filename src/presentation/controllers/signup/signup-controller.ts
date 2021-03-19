import { HttpResponse, HttpRequest, Controller, AddAccount } from './signup-controller-protocols'
import { badRequest, serverError, okRequest } from '../../helpers/http/http-helper'
import { Validation } from '../../protocols/validation'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation) {}

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
