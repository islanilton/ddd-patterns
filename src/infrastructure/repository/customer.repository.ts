import { Customer } from '@/domain/entity/customer'
import { CustomerRepositoryInterface } from '@/domain/repository/customer.repository.interface'
import { CustomerModel } from '@/infrastructure/db/sequelize/model/customer.model'
import { Address } from '@/domain/entity/address'

export class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      zipcode: entity.Address.zip,
      state: entity.Address.state,
      city: entity.Address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    })
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.Address.street,
        number: entity.Address.number,
        zipcode: entity.Address.zip,
        state: entity.Address.state,
        city: entity.Address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      },
    )
  }

  async find(id: string): Promise<Customer | null> {
    try {
      const customerModel: CustomerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      })

      const customer: Customer = new Customer({
        id: customerModel.id,
        name: customerModel.name,
      })

      customer.Address = new Address({
        street: customerModel.street,
        number: customerModel.number,
        city: customerModel.city,
        state: customerModel.state,
        zip: customerModel.zipcode,
      })

      customer.addRewardPoints(customerModel.rewardPoints)
      return customer
    } catch (error) {
      throw new Error('Customer not found')
    }
  }

  async findAll(): Promise<Customer[]> {
    const customerModels: CustomerModel[] = await CustomerModel.findAll()
    return customerModels.map((customerModel: CustomerModel) => {
      const customer: Customer = new Customer({
        id: customerModel.id,
        name: customerModel.name,
      })
      const address: Address = new Address({
        street: customerModel.street,
        number: customerModel.number,
        city: customerModel.city,
        state: customerModel.state,
        zip: customerModel.zipcode,
      })
      customer.changeAddress(address)
      customer.addRewardPoints(customerModel.rewardPoints)
      if (customerModel.active) {
        customer.activate()
      }
      return customer
    })
  }
}
