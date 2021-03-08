export class SignUpController {
  handle (httpRequets: any): any {
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
