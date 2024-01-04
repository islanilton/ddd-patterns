import { ProductFactory } from '@/domain/product/factory/product.factory'
import { ListProductUseCase } from './list.product.usecase'

const product1 = ProductFactory.create('Product 1', 10)
const product2 = ProductFactory.create('Product 2', 20)

const MockProductRepository = () => ({
  create: jest.fn(),
  update: jest.fn(),
  find: jest.fn(),
  findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
})

describe('Unit Test List Product use case', () => {
  it('should list all products', async () => {
    const productRepository = MockProductRepository()
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
