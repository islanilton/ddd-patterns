import { v4 as uuid } from 'uuid'
import { Product } from '@/domain/product/entity/product'

export class ProductFactory {
  static create(name: string, price: number, id = uuid()): Product {
    return new Product({ id, name, price })
  }
}
