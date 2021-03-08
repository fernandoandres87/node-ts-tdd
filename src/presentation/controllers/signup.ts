import { HttpResponse, HttpRequest } from '../protocols/http'

export class SignUpController {
  handle (httpRequets: HttpRequest): HttpResponse {
    if (!httpRequets.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name')
      }
    }
    if (!httpRequets.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email')
      }
    }
  }
}
