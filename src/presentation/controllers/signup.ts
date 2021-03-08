export class SignUpController {
  handle (httpRequets: any): any {
    return {
      statusCode: 400,
      body: new Error('Missing param: name')
    }
  }
}
