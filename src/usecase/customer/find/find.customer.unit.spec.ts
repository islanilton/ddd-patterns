import { Sequelize } from 'sequelize-typescript'
import { CustomerModel } from '@/infrastructure/customer/repository/sequelize/customer.model'
import { CustomerRepository } from '@/infrastructure/customer/repository/sequelize/customer.repository'
import { Customer } from '@/domain/customer/entity/customer'
import { Address } from '@/domain/customer/value-object/address'
import { FindCustomerUseCase } from '@/usecase/customer/find/find.customer.usecase'

describe('Test Find Customer use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })
    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const sut = new FindCustomerUseCase(customerRepository)
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
    await customerRepository.create(customer)

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
})
