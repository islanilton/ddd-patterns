import { Customer } from '@/domain/customer/entity/customer'
import { Address } from '@/domain/customer/value-object/address'
import { FindCustomerUseCase } from '@/usecase/customer/find/find.customer.usecase'

const customer = new Customer({
  id: '1',
  name: 'Customer 1',
})
const address = new Address({
  street: 'Rua da Cidade',
  number: 100,
  city: 'Cidade',
  state: 'Estado',
  zip: '00000000',
})
customer.changeAddress(address)

const MockCustomerRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
  }
}

describe('Unit Test Find Customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = MockCustomerRepository()
    const sut = new FindCustomerUseCase(customerRepository)
    const input = {
      id: '1',
    }

    const output = {
      id: '1',
      name: 'Customer 1',
      address: {
        street: 'Rua da Cidade',
        number: 100,
        city: 'Cidade',
        state: 'Estado',
        zip: '00000000',
      },
    }

    const result = await sut.execute(input)
    expect(result).toEqual(output)
  })
  it('should not find a customer', async () => {
    const customerRepository = MockCustomerRepository()
    const sut = new FindCustomerUseCase(customerRepository)
    sut.customerRepository.find = jest.fn().mockImplementation(() => {
      throw new Error('Customer not found')
    })
    const input = {
      id: '2',
    }

    await expect(() => sut.execute(input)).rejects.toThrow(
      new Error('Customer not found'),
    )
  })
})
