import { v4 as uuid } from 'uuid'
import { ProductInterface } from '@/domain/product/entity/product.interface'
import { Product } from '@/domain/product/entity/product'
import { ProductB } from '@/domain/product/entity/product-b'

export class ProductFactory {
  static create(type: string, name: string, price: number): ProductInterface {
    switch (type) {
      case 'a':
        return new Product({ id: uuid(), name, price })
      case 'b':
        return new ProductB({ id: uuid(), name, price })
      default:
        throw new Error('Product type not supported')
    }
  }
}
