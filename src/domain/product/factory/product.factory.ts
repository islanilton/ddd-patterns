import { v4 as uuid } from 'uuid'
import { Product } from '@/domain/product/entity/product'
import { ProductInterface } from '@/domain/product/entity/product.interface'

export class ProductFactory {
  static create(name: string, price: number): ProductInterface {
    return new Product({ id: uuid(), name, price })
  }
}
