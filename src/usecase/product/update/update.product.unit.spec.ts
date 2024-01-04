import { ProductFactory } from '@/domain/product/factory/product.factory'
import { UpdateProductUseCase } from './update.product.usecase'

const product = ProductFactory.create('Product 1', 10)

const input = {
  id: product.id,
  name: 'Product 1 Updated',
  price: 20,
}

const MockProductRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  }
}

describe('Unit Test Update Product use case', () => {
  it('should update a product', async () => {
    const productRepository = MockProductRepository()
    const sut = new UpdateProductUseCase(productRepository)
    const output = await sut.execute(input)
    expect(output).toEqual(input)
  })
})
