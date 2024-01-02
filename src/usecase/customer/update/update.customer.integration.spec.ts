import { CustomerFactory } from '@/domain/customer/factory/customer.factory'
import { Address } from '@/domain/customer/value-object/address'
import { CustomerModel } from '@/infrastructure/customer/repository/sequelize/customer.model'
import { CustomerRepository } from '@/infrastructure/customer/repository/sequelize/customer.repository'
import { Sequelize } from 'sequelize-typescript'
import { UpdateCustomerUseCase } from './update.customer.usecase'

describe('Integration Test Update Customer use case', () => {
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

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository()
    const sut = new UpdateCustomerUseCase(customerRepository)
    const customer = CustomerFactory.createWithAddress(
      'Customer 1',
      new Address({
        street: 'Rua da Cidade',
        number: 100,
        city: 'Cidade',
        state: 'Estado',
        zip: '00000000',
      }),
    )

    await customerRepository.create(customer)
    customer.changeName('Customer 2')
    const input = {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        city: customer.Address.city,
        state: customer.Address.state,
        zip: customer.Address.zip,
      },
    }
    const output = await sut.execute(input)
    expect(output).toEqual(input)
  })
})
