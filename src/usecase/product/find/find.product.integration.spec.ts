import { Address } from '@/domain/customer/value-object/address'
import { Product } from '@/domain/product/entity/product'
import { ProductModel } from '@/infrastructure/product/repository/sequelize/product.model'
import { ProductRepository } from '@/infrastructure/product/repository/sequelize/product.repository'
import { Sequelize } from 'sequelize-typescript'
import { FindProductUseCase } from './find.product.usecase'
import { ProductFactory } from '@/domain/product/factory/product.factory'

describe('Integration Test Find Product use case', () => {
  let sequelize: Sequelize
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })
    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find a product', async () => {
    const productRepository = new ProductRepository()
    const sut = new FindProductUseCase(productRepository)
    const product = ProductFactory.create('Product 1', 10, '1')

    await productRepository.create(product)

    const input = {
      id: '1',
    }

    const output = {
      id: '1',
      name: 'Product 1',
      price: 10,
    }

    const result = await sut.execute(input)
    expect(result).toEqual(output)
  })
})
