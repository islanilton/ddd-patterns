import { CustomerModel } from '@/infrastructure/customer/repository/sequelize/customer.model'
import { CustomerRepository } from '@/infrastructure/customer/repository/sequelize/customer.repository'

import { CreateCustomerUseCase } from './create.customer.usecase'
import { Sequelize } from 'sequelize-typescript'

describe('Integration Test Create Customer use case', () => {
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
  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository()
    const sut = new CreateCustomerUseCase(customerRepository)
    const input = {
      name: 'Customer 1',
      address: {
        street: 'Rua da Cidade',
        number: 100,
        city: 'Cidade',
        state: 'Estado',
        zip: '00000000',
      },
    }
    const output = {
      id: expect.any(String),
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
