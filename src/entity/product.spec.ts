import { Product } from '@/entity/product'

describe('Product unit test', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const product: Product = new Product({
        id: '',
        name: 'Product 1',
        price: 100,
      })
    }).toThrowError('Id is required')
  })

  it('should th', () => {
    expect(() => {
      const product: Product = new Product({
        id: '1',
        name: '',
        price: 100,
      })
    }).toThrowError('Name is required')
  })

  it('should throw error when price is less than 0', () => {
    expect(() => {
      const product: Product = new Product({
        id: '1',
        name: 'Product 1',
        price: -1,
      })
    }).toThrowError('Price must be greater than 0')
  })

  it('should be able change name', () => {
    const product: Product = new Product({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
    product.changeName('Product 2')
    expect(product.name).toBe('Product 2')
  })

  it('should be able change price', () => {
    const product: Product = new Product({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
    product.changePrice(200)
    expect(product.price).toBe(200)
  })
})
