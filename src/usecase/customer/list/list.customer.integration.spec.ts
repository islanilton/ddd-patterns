import { CustomerModel } from '@/infrastructure/customer/repository/sequelize/customer.model'
import { CustomerRepository } from '@/infrastructure/customer/repository/sequelize/customer.repository'
import { Sequelize } from 'sequelize-typescript'
import { ListCustomerUseCase } from './list.customer.usecase'
import { CustomerFactory } from '@/domain/customer/factory/customer.factory'
import { Address } from '@/domain/customer/value-object/address'

describe('List customer integration test', () => {
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

  it('should list all customers', async () => {
    const customerRepository = new CustomerRepository()
    const sut = new ListCustomerUseCase(customerRepository)

    const customer1 = CustomerFactory.createWithAddress(
      'Customer 1',
      new Address({
        street: 'Main Street',
        city: 'New York',
        number: 123,
        zip: '123456',
        state: 'NY',
      }),
    )

    const customer2 = CustomerFactory.createWithAddress(
      'Customer 2',
      new Address({
        street: 'Main Street 2',
        city: 'New York 2',
        number: 1235,
        zip: '123456',
        state: 'NY',
      }),
    )

    await customerRepository.create(customer1)
    await customerRepository.create(customer2)

    const output = await sut.execute()

    expect(output.customers.length).toEqual(2)
    expect(output.customers[0].name).toEqual(customer1.name)
    expect(output.customers[0].address.street).toEqual(customer1.Address.street)

    expect(output.customers[1].name).toEqual(customer2.name)
    expect(output.customers[1].address.street).toEqual(customer2.Address.street)
    expect(output.customers[1].address.number).toEqual(customer2.Address.number)
  })
})
