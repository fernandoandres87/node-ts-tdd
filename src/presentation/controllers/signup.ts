import { MissingParamError } from '../errors/missing-param-error'
import { HttpResponse, HttpRequest } from '../protocols/http'
import { badRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequets: HttpRequest): HttpResponse {
    if (!httpRequets.body.name) {
      return badRequest(new MissingParamError('name'))
    }
    if (!httpRequets.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
