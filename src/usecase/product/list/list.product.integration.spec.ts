import { Product } from '@/domain/product/entity/product'
import { ProductFactory } from '@/domain/product/factory/product.factory'
import { ProductModel } from '@/infrastructure/product/repository/sequelize/product.model'
import { ProductRepository } from '@/infrastructure/product/repository/sequelize/product.repository'
import { Sequelize } from 'sequelize-typescript'
import { ListProductUseCase } from './list.product.usecase'

describe('Integration Test List Product use case', () => {
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

  it('should list all products', async () => {
    const product1 = ProductFactory.create('Product 1', 10)
    const product2 = ProductFactory.create('Product 2', 20)
    const productRepository = new ProductRepository()
    await productRepository.create(product1)
    await productRepository.create(product2)
    const sut = new ListProductUseCase(productRepository)
    const output = await sut.execute()
    expect(output.products.length).toEqual(2)
    expect(output.products[0].id).toEqual(product1.id)
    expect(output.products[0].name).toEqual(product1.name)
    expect(output.products[0].price).toEqual(product1.price)

    expect(output.products[1].id).toEqual(product2.id)
    expect(output.products[1].name).toEqual(product2.name)
    expect(output.products[1].price).toEqual(product2.price)
  })
})
