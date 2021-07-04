import { AddAccountParams } from '@/domain/useCases/account/add-account'
import { AccountModel } from '@/domain/models/account'

export interface AddAccountRepository {
  add (accountData: AddAccountParams): Promise<AccountModel>
}
