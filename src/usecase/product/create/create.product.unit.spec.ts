import { CreateProductUseCase } from './create.product.usecase'

const input = {
  name: 'Product 1',
  price: 10,
}

const MockProductRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  }
}

describe('Unit Test Create Product use case', () => {
  it('should create a product', async () => {
    const productRepository = MockProductRepository()
    const sut = new CreateProductUseCase(productRepository)
    const output = await sut.execute(input)
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    })
  })

  it('should return an error with name is missing', async () => {
    const productRepository = MockProductRepository()
    const sut = new CreateProductUseCase(productRepository)
    input.name = ''
    await expect(() => sut.execute(input)).rejects.toThrow('Name is required')
  })
})
