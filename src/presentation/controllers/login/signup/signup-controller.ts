import { HttpResponse, HttpRequest, Controller, AddAccount, Authentication } from './signup-controller-protocols'
import { EmailInUseError } from '@/presentation/errors'
import { badRequest, serverError, okRequest, forbidden } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols/validation'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication) {}

  async handle (httpRequets: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequets.body)
      if (error) { return badRequest(error) }
      const { name, email, password, role } = httpRequets.body
      const account = await this.addAccount.add({
        name,
        email,
        password,
        role
      })
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      const accessToken = await this.authentication.auth({
        email,
        password
      })
      return okRequest({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
