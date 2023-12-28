import { CustomerFactory } from '@/domain/customer/factory/customer.factory'
import { CustomerRepositoryInterface } from '@/domain/customer/repository/customer.repository.interface'
import { Address } from '@/domain/customer/value-object/address'
import { InputCreateCustomerDto } from './create.customer.dto'

export class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface
  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(input: InputCreateCustomerDto) {
    const address = new Address({
      street: input.address.street,
      city: input.address.city,
      number: input.address.number,
      zip: input.address.zip,
      state: input.address.state,
    })
    const customer = CustomerFactory.createWithAddress(input.name, address)
    await this.customerRepository.create(customer)
    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip,
        state: customer.Address.state,
      },
    }
  }
}
