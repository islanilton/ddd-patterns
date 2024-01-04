import { ProductModel } from '@/infrastructure/product/repository/sequelize/product.model'
import { ProductRepository } from '@/infrastructure/product/repository/sequelize/product.repository'
import { Sequelize } from 'sequelize-typescript'
import { CreateProductUseCase } from './create.product.usecase'

describe('Integration Test Create Product use case', () => {
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

  it('should create a product', async () => {
    const input = {
      name: 'Product 1',
      price: 10,
    }
    const output = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    }
    const productRepository = new ProductRepository()
    const sut = new CreateProductUseCase(productRepository)
    const result = await sut.execute(input)
    expect(result).toEqual(output)
  })
})
