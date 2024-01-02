import { CustomerRepositoryInterface } from '@/domain/customer/repository/customer.repository.interface'
import { OutputListCustomerDto } from './list.customer.dto'
import { Customer } from '@/domain/customer/entity/customer'

export class ListCustomerUseCase {
  customerRepository: CustomerRepositoryInterface
  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll()
    return OutputMapper.toDto(customers)
  }
}

class OutputMapper {
  static toDto(customer: Customer[]): OutputListCustomerDto {
    return {
      customers: customer.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.Address.street,
          city: customer.Address.city,
          number: customer.Address.number,
          zip: customer.Address.zip,
          state: customer.Address.state,
        },
      })),
    }
  }
}
