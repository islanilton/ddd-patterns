import { Sequelize } from 'sequelize-typescript'
import { CustomerModel } from '@/infrastructure/db/sequelize/model/customer.model'
import { CustomerRepository } from '@/infrastructure/repository/customer.repository'
import { Customer } from '@/domain/customer/entity/customer'
import { Address } from '@/domain/customer/value-object/address'

describe('Customer repository unit test', () => {
  let sequelize: Sequelize

  beforeEach(async (): Promise<void> => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async (): Promise<void> => {
    await sequelize.close()
  })

  it('should create a customer', async (): Promise<void> => {
    const customerRepository: CustomerRepository = new CustomerRepository()
    const customer: Customer = new Customer({
      id: '1',
      name: 'Customer 1',
    })
    customer.Address = new Address({
      street: 'Rua da Casa',
      number: 100,
      city: 'Cidade',
      state: 'Estado',
      zip: '00000000',
    })
    await customerRepository.create(customer)
    const customerModel: CustomerModel = await CustomerModel.findOne({
      where: { id: '1' },
    })
    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: 'Customer 1',
      street: 'Rua da Casa',
      number: 100,
      city: 'Cidade',
      state: 'Estado',
      zipcode: '00000000',
      active: true,
      rewardPoints: 0,
    })
  })

  it('should update a customer', async (): Promise<void> => {
    const customerRepository: CustomerRepository = new CustomerRepository()
    const customer: Customer = new Customer({
      id: '1',
      name: 'Customer 1',
    })
    customer.Address = new Address({
      street: 'Rua da Casa',
      number: 100,
      city: 'Cidade',
      state: 'Estado',
      zip: '00000000',
    })
    await customerRepository.create(customer)
    customer.changeName('Customer updated')
    await customerRepository.update(customer)
    const customerModel: CustomerModel = await CustomerModel.findOne({
      where: { id: '1' },
    })
    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      street: customer.Address.street,
      number: customer.Address.number,
      city: customer.Address.city,
      state: customer.Address.state,
      zipcode: customer.Address.zip,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    })
  })

  it('should find a customer', async (): Promise<void> => {
    const customerRepository: CustomerRepository = new CustomerRepository()
    const customer: Customer = new Customer({
      id: '1',
      name: 'Customer 1',
    })
    customer.Address = new Address({
      street: 'Rua da Casa',
      number: 100,
      city: 'Cidade',
      state: 'Estado',
      zip: '00000000',
    })
    await customerRepository.create(customer)
    const foundCustomer: Customer = await customerRepository.find(customer.id)
    expect(foundCustomer).toStrictEqual(customer)
  })

  it('should find all customers', async (): Promise<void> => {
    const customerRepository: CustomerRepository = new CustomerRepository()
    const customer: Customer = new Customer({
      id: '1',
      name: 'Customer 1',
    })
    customer.Address = new Address({
      street: 'Rua da Casa',
      number: 100,
      city: 'Cidade',
      state: 'Estado',
      zip: '00000000',
    })
    await customerRepository.create(customer)
    const foundCustomers: Customer[] = await customerRepository.findAll()
    expect(foundCustomers).toStrictEqual([customer])
  })

  it('should throw error if customer is not found', async () => {
    const customerRepository: CustomerRepository = new CustomerRepository()
    await expect(async () => {
      await customerRepository.find('1')
    }).rejects.toThrow('Customer not found')
  })
})
