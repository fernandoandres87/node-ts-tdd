import { HttpRequest, HttpResponse } from './http'

export interface Controller {
  handle: (httpRequets: HttpRequest) => Promise<HttpResponse>
}
