import { MissingParamError } from '../../errors'
import { badRequest, okRequest, serverError, unauthorized } from '../../helpers/http/http-helper'
import { HttpRequest, Authentication, Validation } from './login-protocols'
import { LoginController } from './login'

const makeAuthentication = (): Authentication => {
  class AuthenticatioStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }
  return new AuthenticatioStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@mail.com',
    password: 'any_password'
  }
})

interface SutTypes {
  sut: LoginController
  validationStub: Validation
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const validationStub = makeValidation()
  const authenticationStub = makeAuthentication()
  const sut = new LoginController(validationStub, authenticationStub)
  return {
    sut,
    validationStub,
    authenticationStub
  }
}
describe('Login Controller', () => {
  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut()
    const authSpy = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makeFakeRequest())
    expect(authSpy).toHaveBeenCalledWith('any_email@mail.com', 'any_password')
  })
  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(unauthorized())
  })
  test('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut()
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(okRequest({ accessToken: 'any_token' }))
  })
  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequets = makeFakeRequest()
    await sut.handle(httpRequets)
    expect(validateSpy).toHaveBeenCalledWith(httpRequets.body)
  })
  test('Should return 400 if validation return an error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
  })
})
