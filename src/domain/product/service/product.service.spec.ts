import { Product } from '@/domain/product/entity/product'
import { ProductService } from '@/domain/product/service/product.service'

describe('Product service unit test', () => {
  it('should be able change the prices of all products', () => {
    const product1 = new Product({
      id: '1',
      name: 'Product 1',
      price: 100,
    })
    const product2 = new Product({
      id: '2',
      name: 'Product 2',
      price: 200,
    })
    const products = [product1, product2]
    ProductService.increasePrice(products, 100)

    expect(product1.price).toBe(200)
    expect(product2.price).toBe(400)
  })
})
