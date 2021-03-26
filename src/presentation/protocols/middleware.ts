import { HttpRequest, HttpResponse } from './http'

export interface Middleware {
  handle: (httpRequets: HttpRequest) => Promise<HttpResponse>
}
