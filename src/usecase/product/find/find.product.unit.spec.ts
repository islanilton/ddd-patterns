import { ProductFactory } from '@/domain/product/factory/product.factory'
import { FindProductUseCase } from './find.product.usecase'

const product = ProductFactory.create('Product 1', 100, '1')

const MockProductRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  }
}

describe('Unit Test Find Product use case', () => {
  it('should find a product', async () => {
    const productRepository = MockProductRepository()
    const sut = new FindProductUseCase(productRepository)
    const input = {
      id: '1',
    }

    const output = {
      id: '1',
      name: 'Product 1',
      price: 100,
    }

    const result = await sut.execute(input)
    expect(result).toEqual(output)
  })
  it('should not find a product', async () => {
    const productRepository = MockProductRepository()
    const sut = new FindProductUseCase(productRepository)
    sut.productRepository.find = jest.fn().mockImplementation(() => {
      throw new Error('Product not found')
    })
    const input = {
      id: '2',
    }

    await expect(() => sut.execute(input)).rejects.toThrow(
      new Error('Product not found'),
    )
  })
})
