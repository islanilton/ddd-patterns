import { ProductFactory } from '@/domain/product/factory/product.factory'

describe('Product factory unit Test', () => {
  it('should create a product a', () => {
    const product = ProductFactory.create('a', 'Product 1', 100)
    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product 1')
    expect(product.price).toBe(100)
  })

  it('should create a product b', () => {
    const product = ProductFactory.create('b', 'Product B', 100)
    expect(product.id).toBeDefined()
    expect(product.name).toBe('Product B')
    expect(product.price).toBe(200)
  })

  it('should throw error when type is not supported', () => {
    expect(() => {
      ProductFactory.create('c', 'Product C', 100)
    }).toThrowError('Product type not supported')
  })
})
