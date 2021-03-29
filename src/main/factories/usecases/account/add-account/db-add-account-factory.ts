import { DbAddAccount } from '../../../../../data/usecases/add-account/db-add-account'
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository'
import { AddAccount } from '../../../../../domain/useCases/add-account'
import { BcryptAdapter } from '../../../../../infra/criptograohy/bcrypt-adapter/bcrypt-adapter'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 10
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository)
}
