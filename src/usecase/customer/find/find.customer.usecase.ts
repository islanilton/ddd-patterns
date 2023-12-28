import {
  InputFindCustomerDto,
  OutputFindCustomerDto,
} from '@/usecase/customer/find/find.customer.dto'
import { CustomerRepositoryInterface } from '@/domain/customer/repository/customer.repository.interface'

export class FindCustomerUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface,
  ) {}

  async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.find(input.id)
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
