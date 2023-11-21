import { Customer } from '@/domain/customer/entity/customer'
import { RepositoryInterface } from '@/domain/@shared/reposistory/repository.interface'

export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
