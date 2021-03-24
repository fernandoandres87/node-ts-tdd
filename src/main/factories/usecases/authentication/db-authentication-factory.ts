import env from '../../../config/env'
import { DbAuthentication } from '../../../../data/usecases/authentication/db-authentication'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../../infra/criptograohy/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/criptograohy/jwt-adapter/jwt-adapter'
import { Authentication } from '../../../../domain/useCases/authentication'

export const makeDbAuthentication = (): Authentication => {
  const salt = 10
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
