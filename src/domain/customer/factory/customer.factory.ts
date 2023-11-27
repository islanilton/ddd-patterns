import { v4 as uuid } from 'uuid'
import { Customer } from '@/domain/customer/entity/customer'
import { Address } from '@/domain/customer/value-object/address'

export class CustomerFactory {
  static create(name: string): Customer {
    return new Customer({ id: uuid(), name })
  }

  static createWithAddress(name: string, address: Address): Customer {
    const customer: Customer = this.create(name)
    customer.changeAddress(address)
    return customer
  }
}
