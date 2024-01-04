import { ProductFactory } from '@/domain/product/factory/product.factory'
import { ProductModel } from '@/infrastructure/product/repository/sequelize/product.model'
import { ProductRepository } from '@/infrastructure/product/repository/sequelize/product.repository'
import { Sequelize } from 'sequelize-typescript'
import { UpdateProductUseCase } from './update.product.usecase'

describe('Integration Test Update Product use case', () => {
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

  it('should update a product', async () => {
    const product = ProductFactory.create('Product 1', 10)
    const input = {
      id: product.id,
      name: 'Product 1 Updated',
      price: 20,
    }
    const output = {
      id: product.id,
      name: input.name,
      price: input.price,
    }
    const productRepository = new ProductRepository()
    await productRepository.create(product)
    const sut = new UpdateProductUseCase(productRepository)
    const result = await sut.execute(input)
    expect(result).toEqual(output)
  })
})
