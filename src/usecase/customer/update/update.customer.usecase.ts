import { CustomerRepositoryInterface } from '@/domain/customer/repository/customer.repository.interface'
import {
  InputUpdateCustomerDto,
  OutputUpdateCustomerDto,
} from './update.customer.dto'
import { Address } from '@/domain/customer/value-object/address'

export class UpdateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface
  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(
    input: InputUpdateCustomerDto,
  ): Promise<OutputUpdateCustomerDto> {
    const customer = await this.customerRepository.find(input.id)
    customer.changeName(input.name)
    customer.changeAddress(
      new Address({
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
        state: input.address.state,
      }),
    )
    await this.customerRepository.update(customer)
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
