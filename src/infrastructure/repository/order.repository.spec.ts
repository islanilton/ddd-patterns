import { Sequelize } from 'sequelize-typescript'
import { CustomerModel } from '@/infrastructure/db/sequelize/model/customer.model'
import { CustomerRepository } from '@/infrastructure/repository/customer.repository'
import { Customer } from '@/domain/entity/customer'
import { Address } from '@/domain/entity/address'

describe('Order repository unit test', () => {
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
})
